function HTMLConsole(element) {
    var consoleElement = element

    function outputLine(line) {
        outputText(line + "\n")
    }

    function outputText(text) {
        consoleElement.innerHTML += text.replaceAll("<", "&lt;").replaceAll("\n", "<br>")
    }

    function outputHTML(html) {
        consoleElement.innerHTML += html + "\n"
    }

    async function ask(askingText) {
        outputHTML(/*html*/`<form><input type="text"></form>`)
        var formElement = consoleElement.querySelector("form:last-of-type")
        var input = formElement.querySelector("input")
        input.placeholder = askingText
        input.focus()
        var promise = new Promise((resolve) => {
            formElement.onsubmit = function (event) {
                var formElement = event.target
                var value = formElement.querySelector("input").value
                formElement.remove()
                resolve(value)
                return false;
            }
        })
        return promise
    }

    return { outputLine, outputText, outputHTML, ask }
}
