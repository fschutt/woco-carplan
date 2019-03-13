#![windows_subsystem = "windows"]

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate log;
extern crate serde;
extern crate serde_json;
extern crate urlencoding;
extern crate web_view;
extern crate fern;

use web_view::{Error as WebViewError, WebView, WebViewBuilder, Content as WebViewContent};
use std::{path::PathBuf, env};

const APP_TITLE: &str = "Woco CarPlan";
const LOG_FILE_PATH: &str = "error.log";

#[derive(Serialize, Deserialize, Copy, Clone, Debug, Default, PartialEq, Eq, PartialOrd, Ord)]
pub struct CarPlanData {

}

#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    #[serde(rename = "init")]
    Init,
    #[serde(rename = "init")]
    Log { text: String },
}

fn web_view_cb<'a>(web_view: &mut WebView<'a, CarPlanData>, json: &str) -> Result<(), WebViewError> {

    let cmd: Cmd = serde_json::from_str(json).map_err(|e| {
        error!("[Rust] Got garbage RPC from JS: {:?}\r\n\r\n{}", json, e);
        WebViewError::Custom(Box::new(format!("{}", e)))
    })?;

    match cmd {
        Cmd::Init => { println!("init!"); },
        Cmd::Log { text } => { println!("{}", text); },
    }

    // let data = web_view_cb.get_data_mut();
    // webview.eval(&format!("rpc.render({})", serde_json::to_string(tasks).unwrap()));

    Ok(())
}


/// Opens a window with the given URL, returns if the window has launched successfully
fn open_window(html: &str, title: &str, data: CarPlanData) -> Option<CarPlanData> {

    // use urlencoding::encode;

    // let url = format!("data:text/html,{}", encode(html));

    #[cfg(debug_assertions)]
    let debug = true;
    #[cfg(not(debug_assertions))]
    let debug = false;

    WebViewBuilder::new()
        .title(title)
        .content(WebViewContent::Html(html))
        .debug(debug)
        .resizable(true)
        .invoke_handler(web_view_cb)
        .user_data(data)
        .run().ok()
}

fn make_relative_file_path(input: &str) -> PathBuf {
    let mut exe_location = env::current_exe().unwrap_or_default();
    exe_location.pop();
    exe_location.push(input);
    exe_location
}

fn set_up_logging(log_file_path: &str) -> Option<()> {

    use fern::{Dispatch, log_file};
    use log::LevelFilter;

    const LOG_LEVEL_FILTER: LevelFilter = LevelFilter::Debug;

    Dispatch::new()
        .format(|out, message, record| out.finish(format_args!("[{}][{}] {}", record.level(), record.target(), message)))
        .level(LOG_LEVEL_FILTER)
        .chain(log_file(make_relative_file_path(log_file_path)).ok()?)
        .apply()
        .ok()?;

    Some(())
}

/// Injects the CSS styles into the HTML
fn inject_styles(html: &str, styles: &[&str]) -> String {
    let combined_css = format!(r#"<style type="text/css" style="display: none;">{}</style>"#, styles.join("\r\n"));
    html.replace("{{styles}}", &combined_css)
}

fn main() {

    set_up_logging(LOG_FILE_PATH).unwrap_or_else(|| { println!("ERROR: Could not set up logging!"); });

    let html = include_str!("./html/main.html");
    let html = inject_styles(html, &[
        include_str!("./css/main.css"),
    ]);

    let userdata = CarPlanData::default();

    match open_window(&html, APP_TITLE, userdata) {
        Some(_) => { },
        None => { error!("failed to launch {}", env!("CARGO_PKG_NAME")); },
    }
}
