export class UserRegister {
    constructor(
        public fname?: string,
        public lname?: string,
        public email?: string,
        public password?: string,
        public contact?: number,
        public dob?: Date,
        public isactive?: boolean,
    ) {
    }
}