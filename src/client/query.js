// # Quering via GROQ
// https://www.youtube.com/watch?v=NO7_jgzVgbc

// fetch user data by name
export const getUserByUserName = (userName) => {
    const query = `*[_type=='user' && userName=="${userName}"]`;
    return query;
};

// fetch user data by ID
export const getUserById = (id) => {
    const query = `*[_type=='user' && _id=="${id}"]`;
    return query;
};

export const deleteById = (type, id) => {
    const query = `*[_type=="${type}" && _id=="${id}"]`;
    return query;
};

// get all post in database
export const getPost = () => {
    const query = `*[_type=='posts'] | order(_createdAt desc){
      image {
        asset -> {
            url
        }
      } ,
      _id,
      content,
      postedBy -> {
        _id,
        userName,
        image,
        profile
      },
      comment[]{
        _key,
        comment,
        postedBy -> {
            _id,
            userName,
            image,
            profile
        },}
    }`;

    return query;
};
