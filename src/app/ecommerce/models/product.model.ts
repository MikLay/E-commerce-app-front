export class Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
  special_price: number;

  constructor(id: number, name: string, price: number, image_url: string,  description: string, category: string, special_price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image_url = image_url;
    this.description = description;
    this.category = category;
    this.special_price = special_price;
  }
}
