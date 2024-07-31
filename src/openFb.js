function openNewTab(url, index) {
    browser.tabs.create({
        url: url,
        index: index
    });
}

function main() {
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "openFb") {
            // Get active tab index
            browser.tabs
                .query({ currentWindow: true, active: true })
                .then((tabs) => {
                    for (tab of tabs) {
                        // Open new tab
                        openNewTab(message.url, tab.index + 1)
                    }
                })

        }
    })
}

// Call main()
main()