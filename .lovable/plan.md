# Den Mond E-commerce Store

## Storefront

- Build a bold, mobile-first streetwear storefront using the supplied Den Mond logo, orange/black/cream brand palette, and product photography.
- Create separate Home, Shop, Product, Cart, and Admin routes with responsive navigation and appropriate SEO metadata.
- Seed the initial catalog from the supplied images: logo tees in available colors, graphic tees, and black/white tracksuits.
- Product pages will show image galleries, descriptions, prices, color/size variants, availability, quantity selection, and add-to-cart controls.

## Cart and WhatsApp Checkout

- Add a persistent customer cart with variant details, quantity controls, item removal, subtotal, and cart count.
- At checkout, collect the customer's name, phone, delivery/pickup preference, and address or notes.
- Generate a properly encoded WhatsApp order summary containing customer details, every selected product/variant, quantities, and total, then open WhatsApp to **+27 79 834 9810**.
- No automated WhatsApp service is needed because checkout is a customer-initiated click-to-chat link.

## Admin and Catalog Management

- Enable Lovable Cloud for secure authentication, database persistence, and product image storage.
- Create protected admin login and dashboard routes; only the verified business account using **[simbinikhalaza@gmail.com](mailto:simbinikhalaza@gmail.com)** can receive the admin role.
- Store roles in a separate secured roles table and enforce admin authorization server-side.
- Let the admin create, edit, publish/unpublish, and delete products; manage descriptions, prices in **South African rand (ZAR)**, product images, colors, sizes, and stock/availability.
- Add clear product-form validation, image previews, and success/error feedback.

## Data and Security

- Create products, product images, variants, and user roles tables with explicit grants, row-level access rules, and server-side validation.
- Allow public read access only to published catalog data; restrict all catalog changes to authenticated admins.
- Use a private admin workflow for uploads and never rely on browser storage or hardcoded credentials for authorization.

## Initial Content Assumptions

- Use the supplied photos as the launch catalog and logo asset.
- Because prices were not supplied, initial products will be saved as editable drafts and remain hidden from customers until the admin enters prices and publishes them.
- Use business details from the supplied profile: Den Mond Anstreben Clothing, Matsulu 1203, “Not just clothes, a statement,” phone 079 834 9810, and the supplied Gmail address.

## Verification

- Verify catalog browsing, variant selection, cart calculations, mobile responsiveness, admin authorization and CRUD, product uploads, and the generated WhatsApp order message.
- Same type Products should have a gallery like the identical shirts I just uploaded 