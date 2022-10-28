interface AdminReg {
    id?: String
    firstname: String
    lastname: String
    email: String
    stack: String
    squad: Number
    isActive: Boolean
    password?: String
    role: String
}

interface Query {
    name?: String
    week?: Number
}

interface user {
    firstname: String
    lastname: String
    email: String
    stack: String
    squad: Number
    isActive: Boolean
    profilePicture: String
    phoneNumber: String
    password?: String
    token: String
    role: String
    createdAt?: String
    updatedAt?: String
}