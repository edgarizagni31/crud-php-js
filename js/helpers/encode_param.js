export const encodeParam = ( newUser ) => {
    let params = [];

    for( let property in newUser ) {
        let encodedKey =  encodeURIComponent(property);
        let encodedValue = encodeURIComponent(newUser[ property ]);
        params.push( encodedKey + "=" + encodedValue );
    }

    params = params.join('&');

    return params;
}
