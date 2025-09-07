pub struct User {
    pub id: u32,
    pub username: String,
    pub password: String,
}

impl User {
    pub fn new(id: u32, username: String, password: String) -> Self {
        User {
            id,
            username,
            password,
        }
    }
}
