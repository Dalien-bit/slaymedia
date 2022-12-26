export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id ==  '${userId}']`;
    return query;
}

export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']`;
    return query;
}

// export const similar = (category) => {
//     const query = `*[_type == "pin" && category match ]`
// }

export const searchQuery = (searchItem, start, end) => {
    const query = `*[_type == "pin" && title match '${searchItem}*' || category match '${searchItem}*' || about match '${searchItem}*' ]{
        image {
            asset -> {
                url
            },
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        about,
        title,
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }[${start}...${end}]`;

    return query;
}

export const feedQuery = (start, end) => {
    const query = `*[_type == 'pin'] | order(_createdAt desc) {
        image {
            asset -> {
                url
            },
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        about,
        title,
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }[${start}...${end}]`;


    return query;
}

// export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
//     image {
//         asset -> {
//             url
//         },
//     },
//     _id,
//     destination,
//     postedBy -> {
//         _id,
//         userName,
//         image
//     },
//     about,
//     title,
//     save[] {
//         _key,
//         postedBy -> {
//             _id,
//             userName,
//             image
//         },
//     },
// }`;