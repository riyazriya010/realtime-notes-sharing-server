
//Services
export type LoginData = {
    email: string;
    password: string;
}

export type NotesSave = {
    title: string;
    content: string;
}



// Repository
export type SignUpData = {
    username: string;
    email: string;
    password: string;
}


export type NotesSaveRepo = {
    title: string;
    content: string;
    createdBy: any
}