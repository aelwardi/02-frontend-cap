export class SuperAdmin {
    constructor(
        public id: number,
        public firstName?: string,
        public lastName?: string,
        //public dateOfBirth: any = null,
        public dateOfBirth?: Date,
        public phone?: string,
        public sexe?: string,
        public photo?: any,
        public email?: string,
        public password?: string,
        public etat?: boolean,
        public role?: string
    ) { }

    toJSON() {
        return {
          id: this.id
        };
      }
    
      static fromId(id: number) {
        return new SuperAdmin(id);
      }
}