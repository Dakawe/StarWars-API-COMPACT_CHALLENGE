const API = async (GET, URL = `https://swapi.dev/api/people/?page=1`) => (await fetch(URL)).json().then((r) => (GET ? r[GET] : r)),
  $ = (E, ALL) => (ALL ? document.querySelectorAll(E) : document.querySelector(E)),
  CLICK = (E, ACT) => ($(E).onclick = async () => CHAR(ACT)),
  DEL = () => ["#NAME", "#DETAIL", "#WORLD"].forEach((del) => ($(del).innerHTML = "")),
  WRITE = (E, GET, TITLE, DO = ($(E).innerHTML = `<h2>${TITLE}</h2>`)) =>
    GET.forEach((r) => ($(E).innerHTML += `<article><b>${r[0].replace("_", " ")}</b><p>${r[1]}</p></article>`)),
  CHAR = async (URL, act = DEL()) => { const STREAM = await API(undefined, URL); CLICK("#BACK", STREAM.previous); CLICK("#NEXT", STREAM.next);
    STREAM.results.forEach((r) => ($("#NAME").innerHTML += `<article id="${r.url}"><p>${r.name}</p></article>`));
      $("#NAME article", 1).forEach( (SELF) =>
          (SELF.onclick = async (INFO, HOME) => { INFO = await API(undefined, SELF.id); HOME = await API(undefined, INFO.homeworld);
            WRITE("#DETAIL", Object.entries(INFO).splice(1, 7), INFO.name); WRITE("#WORLD", Object.entries(HOME).splice(1, 7), `PLANET ${HOME.name}`);
          }));};

CHAR();
