export class CheckoutForm {
    name!: string;
    email!: string;
    phone!: number;
    city!: string;
    district!: string;
    ward!: string;
    note?: string;

    // constructor() {
    //     this.name = "";
    //     this.email = "";
    //     this.phone = undefined;
    //     this.city = "";
    //     this.district = "",
    //     this.ward = "";
    //     this.note = "";
    // }
}

export class Cities {
    name!: string;
    slug!: string;
    type!: string;
    name_with_type!: string;
    code!: string;
    quan_huyen!: Districts[]
}

export class Districts {
    name!: string;
    type!: string;
    slug!: string;
    name_with_type!: string;
    path!: string;
    path_with_type!: string;
    code!: string;
    parent_code!: string;
    xa_phuong!: Wards[]
}

export class Wards {
    name!: string;
    type!: string;
    slug!: string;
    name_with_type!: string;
    path!: string;
    path_with_type!: string;
    code!: string;
    parent_code!: string;
}