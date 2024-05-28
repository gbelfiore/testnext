function removeParamUrl(url: string, param: string = 'search') {
  // Usa l'URL per ottenere l'oggetto URL
  //const urlObject = new URL(url);

  //const searchParams = new URLSearchParams(window.location.search);
  //searchParams.set("foo", "bar");
  //return searchParams;

  // Rimuovi la rotta "search" dalla pathname
  let pathnameArray = url.split('/')
  pathnameArray = pathnameArray.filter((segment) => segment.toLowerCase() !== param)
  url = pathnameArray.join('/')

  // Restituisci l'URL modificato
  return url
}

export { removeParamUrl }
