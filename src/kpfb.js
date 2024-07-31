class kpfb {
    static #FB_URL = "https://flicksbar.mom"
    static #PARENT1_ID = "umdel3online_button_desktop"
    static #PARENT2_CLASSNAME = "styles_buttonsContainer__i6y3F"

    static #BUTTON_ONCLICK() {
        try {
            const kpUrl = window.location.href

            browser.runtime.sendMessage({ command: "openFb", url: kpfb.getFbLink(kpUrl) });
        }
        catch (e) {
            console.error(e)
        }
    }

    static #getFilmId(url) {
        let film = url.pathname.toString()

        if (!film) {
            throw "Error(KPFB): Failed to find film id"
        }

        return film
    }

    static #createFbLink(film) {
        return this.#FB_URL + film
    }

    // Must handle exceptions when calling this methode
    static getFbLink(kpUrl) {
        try {
            kpUrl = new URL(kpUrl)
            const film = this.#getFilmId(kpUrl)

            return this.#createFbLink(film)
        }
        catch (e) {
            throw e
        }
    }

    static createButton() {
        // Button
        const kpfb_button = document.createElement("img")
        kpfb_button.id = "KPFB"
        kpfb_button.style.width = "48px"
        kpfb_button.style.height = "48px"
        kpfb_button.style.paddingRight = "10px"

        const img = browser.runtime.getURL("icons/kpfb-48.png")
        kpfb_button.src = img

        kpfb_button.onclick = this.#BUTTON_ONCLICK

        const parent = document.getElementById(this.#PARENT1_ID) || document.getElementsByClassName(this.#PARENT2_CLASSNAME)[0]
        parent.appendChild(kpfb_button)
    }
}

function main() {
    kpfb.createButton()
}

// Call main()
main()