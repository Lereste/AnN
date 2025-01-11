# =================== USER ===================
## POST - Sign Up: .../api/v1/users/signup
{
    "name": "Hồ Hoàng Hảo - admin",
    "email": "hohoanghao1999@gmail.com",
    "password": "admin1234",
    "passwordConfirm": "admin1234"
}

## POST - Log In: .../api/v1/users/login
{
    "email": "hohoanghao1999@gmail.com",
    "password": "admin1234"
}

## GET - Log Out: .../api/v1/users/logout

## POST - For Got Password: .../api/v1/users/forgotPassword

# =================== PRODUCT ===================
## GET - Seach Multi Products: ../api/v1/products/search?query={string}

## GET - All Products: .../api/v1/products

## GET - Get 1 Product By Slug: .../api/v1/products/productItem?query={string}

## GET - Review of Product: .../api/v1/products/{productId}/reviews 

## POST - Create Product: .../api/v1/products
    - Form-data
    {
        "name": "Samsung s24 Ultra 5g",
        "description": "King of Android",
        "image": File (already have default),
        "imageList": File[],
        "categoryId": "67469596f6bccd83dcfca19c",
        "price": 123435
        "priceDiscount": 3123
    }

## DELETE - Delete Product By Id: .../api/v1/products/{productId}

## PATCH - Update Product By Id:.../api/v1/products/{productId}
    - Form-data
    {
        "name": "Samsung s24 Ultra 5g",
        ...
    }

# =================== Category ===================
## GET - All Categories: .../api/v1/categories
## GET - Products By Category Id: .../api/v1/categories/{categoryId}

## POST - Create 1 Category: .../api/v1/categories
    - Body > raw > JSON:  
    {
        "name": "refrigerator"
    }

# =================== Review ===================
## GET - All Reviews: .../api/v1/reviews

## GET - Get Review By Id: .../api/v1/reviews/{reviewId}

## POST - Create A Review: .../api/v1/reviews
{
    "review": "Sản phẩm tốt",
    "rating": 5,
    "user": "userId",
    "product": "productId"
}

## PATCH - Update A Review: .../api/v1/reviews/{reviewId}
{
    "review": "Iphone xịn 22222",
    "rating": 5
}