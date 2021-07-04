export const getQueryParam = ( param:string, url:string ) => {
  
  let href = url;
  //this expression is to get the query strings
  let reg = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' );
  let queryString = reg.exec(href);
  return queryString ? queryString[1] : null;
}

export const replaceQueryParam = (search:string, param:string, newval:string) => {

  let regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
  let query = search.replace(regex, "$1").replace(/&$/, '');

  return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}