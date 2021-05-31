export const getUsers = async ( id = 0 ) => {
    let users = [];

    await fetch( 'index.php' )
        .then ( res => res.ok ? res.json() : [] )
        .then ( data => users = data);
    
    if ( id != 0) {
        users = users.filter( user => user.id == id );
    }
    return users;
}

export const sendUser = async( data ) => {
    let result = [];
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }

    await fetch('index.php', options)
        .then( res => res.ok ? res.json() : [])
        .then( res => result = res);

    return result;
} 

export const updateUser = async( id, data ) => {
    let result = [];
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }

    await fetch('index.php?id='+id, options)
        .then( res => res.ok ? res.json() : [])
        .then( res => result = res);

    return result;
}


export const deleteUser = async ( id ) => {
    let result = [];
    const options = {
        method: 'DELETE'
    }

    await fetch('index.php?id='+id, options)
        .then( res => res.ok ? res.json() : [])
        .then( res => result = res);

    return result;
}