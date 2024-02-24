import { Product } from "@/types";

const products: Product[] = [
  {
    id: "1",
    title: "Creative Anime Adventure T-Shirt",
    keywords: "anime, adventure, creative, t-shirt",
    reviews: [
      {
        id: "review1",
        username: "AnimeFan22",
        rating: 5,
        comment:
          "Absolutely love the design and quality! Will definitely buy more.",
      },
      {
        id: "review2",
        username: "AdventureSeeker",
        rating: 4,
        comment:
          "Great shirt for expressing my love for anime and adventure. Slightly tight around the sleeves.",
      },
    ],
    images: {
      "#12355b": "/jacket.png",
      "#420039": "/jacket.png",
      "#d72638": "/jacket.png",
      "#ffffff": "/jacket.png",
      "#ff570a": "/jacket.png",
    },
    categories: "Anime, Adventure",
    price: 700,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
    description:
      "Embark on a creative journey with this anime-inspired adventure t-shirt. Express yourself with vibrant colors and unique designs.",
    name: "Anime Adventure Tee",
    quantity: 99,
    likes: 0,
  },
  {
    id: "2",
    title: "Stylish Women's Collection T-Shirt",
    keywords: "women, collection, stylish, t-shirt",
    reviews: [
      {
        id: "review1",
        username: "Fashionista123",
        rating: 5,
        comment:
          "Absolutely stunning design! Perfect fit and incredibly comfortable.",
      },
      {
        id: "review2",
        username: "TrendyExplorer",
        rating: 4,
        comment: "Great addition to my wardrobe. Love the unique patterns!",
      },
      // Add more reviews as needed
    ],
    images: {
      "#12355b": "/women-collection.png",
      "#420039": "/women-collection.png",
      "#d72638": "/women-collection.png",
      "#ffffff": "/women-collection.png",
      "#ff570a": "/women-collection.png",
    },
    categories: "Women, Stylish",
    price: 600,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
    description:
      "Elevate your style with this stylish women's collection t-shirt. Featuring unique patterns and a comfortable fit, it's a must-have for fashion enthusiasts.",
    name: "Stylish Women's Tee",
    quantity: 120,
    likes: 0,
  },
  {
    id: "3",
    title: "Blue Adventure Jacket",
    keywords: "blue, adventure, jacket, clothing",
    reviews: [
      {
        id: "review1",
        username: "OutdoorExplorer",
        rating: 5,
        comment:
          "Perfect for outdoor adventures! The blue color is vibrant, and the material is durable.",
      },
      {
        id: "review2",
        username: "CasualAdventurer",
        rating: 4,
        comment:
          "Great jacket for casual outings. Love the stylish and functional design.",
      },
      // Add more reviews as needed
    ],
    images: {
      "#12355b": "/blue-jacket.png",
      "#420039": "/blue-jacket.png",
      "#d72638": "/blue-jacket.png",
      "#ffffff": "/blue-jacket.png",
      "#ff570a": "/blue-jacket.png",
    },
    categories: "Adventure, Jacket",
    price: 500,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
    description:
      "Embark on adventures in style with this blue adventure jacket. Designed for both functionality and fashion, it's your go-to choice for outdoor escapades.",
    name: "Blue Adventure Jacket",
    quantity: 80,
    likes: 0,
  },
  {
    id: "4",
    title: "Men's Casual Collection T-Shirt",
    keywords: "men, casual, collection, t-shirt",
    reviews: [
      {
        id: "review1",
        username: "CasualChic",
        rating: 5,
        comment:
          "Perfect blend of style and comfort! The fabric is soft, and the fit is just right.",
      },
      {
        id: "review2",
        username: "EverydayElegance",
        rating: 4,
        comment:
          "Great addition to my casual wardrobe. Love the versatility of the designs.",
      },
      // Add more reviews as needed
    ],
    images: {
      "#12355b": "/men-collection.png",
      "#420039": "/men-collection.png",
      "#d72638": "/men-collection.png",
      "#ffffff": "/men-collection.png",
      "#ff570a": "/men-collection.png",
    },
    categories: "Men, Casual",
    price: 800,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
    description:
      "Upgrade your casual wardrobe with this men's casual collection t-shirt. Featuring versatile designs and a comfortable fit, it's perfect for everyday wear.",
    name: "Men's Casual Tee",
    quantity: 110,
    likes: 0,
  },
];
export default products;
