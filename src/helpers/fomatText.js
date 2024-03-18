const formatText = (text) => {
    const formatText = text.split(/-|\/|\s/);
    return formatText.join("")
}
module.exports = {
    formatText
}