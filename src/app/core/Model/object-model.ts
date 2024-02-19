export class User {
    name!: String
    mobNumber!: String
    uploadPhoto!: String
    age!: String
    dob!: String
    email!: String
    password!: String
    role!: String
    gender!: String
    agreetc!: Boolean
    address!: Address
    aboutYou!: String
}

export class Address {
    id!: Number
    addLine1!: String
    addLine2!: String
    city!: String
    state!: String
    zipCode!: Number
}

export class Product {
    id!: Number
    name!: String
    uploadPhotos!: String
    productDesc!: String
    mrp!: Number
    dp!: Number
    status!: Boolean

}

export class Orders {
    id!: Number
    userId!: Number
    sellerId!: Number
    product!:Product
    dateTime!: String
    deliveryAddress!: String
    contact!: Number
}