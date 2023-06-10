export class SuperAdmin {
    constructor(
        public id: number,
        public firstName: string = '',
        public lastName: string = '',
        public dateBirth: any = null,
        public phone: string = '',
        public sexe: string = '',
        public photo: string = '',
        public email: string = '',
        public password: string = '',
        public etat: boolean = false,
        public role: string = ''
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