const rem = await aw.getJSON("../../user.json")
console.log(rem[0].about);
document.documentElement.append(aw.fullParserCreator(rem[0].about));