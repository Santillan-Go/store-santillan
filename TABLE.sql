CREATE TABLE users (
    id VARCHAR(255) NO NULL,
    name VARCHAR(50),
    password VARCHAR(30)
    PRIMARY KEY (id)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price NUMERIC,
    category VARCHAR(50),
    image TEXT,
    rating JSONB
);



CREATE TABLE cartbyuser (
    id_user VARCHAR(255) NOT NULL,
    quantity INT,
    total NUMERIC,
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
);
 
-- TABLE PRODUCTCARTBYUSER WHERE IT HAS TO HAVE ID(PRODUCT), PRICE, QUANTITY


CREATE TABLE productsbyuser (
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT,
   price NUMERIC
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
)
   SELECT * FROM cartbyuser user
   INNER JOIN productsbyuser productUser ON user.id_user= productUser.id_user
   INNER JOIN products p ON productUser.id_product = p.id;

-- FUNCTIONS
id ==> 85f54451-5353-4778-a2c9-e89763b12646
-- GET OBJECT
WITH cart_items AS (
    SELECT
        p.id,
        p.title,
        p.price,
        pb.quantity
    FROM
        products p
    JOIN
        productsbyuser pb ON p.id = pb.id_product
    WHERE
        pb.id_user = '85f54451-5353-4778-a2c9-e89763b12646'
),
cart_total AS (
    SELECT
        SUM(pb.quantity * p.price) AS total,
        SUM(pb.quantity) AS quantity
    FROM
        productsbyuser pb
    JOIN
        products p ON pb.id_product = p.id
    WHERE
        pb.id_user = '85f54451-5353-4778-a2c9-e89763b12646'
)
SELECT
    json_build_object(
        'cart', json_agg(json_build_object(
            'title', ci.title,
            'price', ci.price,
            'id', ci.id,
            'quantity', ci.quantity
            'image', ci.image
            
        )),
        'total', ct.total,
        'quantity', ct.quantity
    ) AS result
FROM
    cart_items ci,
    cart_total ct;

------------------

-- ADD TO CART
CREATE OR REPLACE FUNCTION add_to_cart(
    p_id_user VARCHAR,
    p_id_product INT,
    p_quantity INT,
    p_price NUMERIC
)
RETURNS VOID AS $$
BEGIN
    -- Attempt to update the quantity if the product already exists in the user's cart
    UPDATE productsbyuser
    SET quantity = quantity + p_quantity
    WHERE id_user = p_id_user AND id_product = p_id_product;

    -- If no rows were updated, insert a new row
    IF NOT FOUND THEN
        INSERT INTO productsbyuser (id_user, id_product, quantity, price)
        VALUES (p_id_user, p_id_product, p_quantity, p_price);
    END IF;
END $$ LANGUAGE plpgsql;

SELECT add_to_cart(`85f54451-5353-4778-a2c9-e89763b12646`, 4, 1, 200);


-- REMOVE FROM CART ONE BY ONE
CREATE OR REPLACE FUNCTION decrement_quantity_or_delete(
    p_id_user VARCHAR,
    p_id_product INT
)
RETURNS VOID AS $$
BEGIN
    -- Check if the product exists in the user's cart and get the quantity
    IF EXISTS (SELECT 1 FROM productsbyuser WHERE id_user = p_id_user AND id_product = p_id_product) THEN
        UPDATE productsbyuser
        SET quantity = quantity - 1
        WHERE id_user = p_id_user AND id_product = p_id_product
        AND quantity > 1;

        -- If quantity is 1, delete the item from the cart
        DELETE FROM productsbyuser
        WHERE id_user = p_id_user AND id_product = p_id_product
        AND quantity = 1;
    END IF;
END $$ LANGUAGE plpgsql;


--DELETE A COMPLETE ITEM FROM CART

CREATE OR REPLACE FUNCTION delete_all_of_product(
    p_id_user VARCHAR,
    p_id_product INT
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM productsbyuser
    WHERE id_user = p_id_user AND id_product = p_id_product;
END $$ LANGUAGE plpgsql;























/*
BASE ON THESE TABLES, HOW WOULD GET THE DESIRE RESULT

CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(50),
    password VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price NUMERIC,
    category VARCHAR(50),
    image TEXT,
    rating JSONB
);

CREATE TABLE cartbyuser (
    id_user VARCHAR(255) NOT NULL,
    quantity INT,
    total NUMERIC,
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE productsbyuser (
    id_user VARCHAR(255) NOT NULL,
    id_product INT NOT NULL,
    quantity INT,
    price NUMERIC,
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
);

*/

--DESIRE RESULT
/*

{
cart:[
{title:"shirt", price:200, id:1, quantity:2},
{title:"deoramt", price:100, id:2, quantity:2}
],
total:600
quantity:4
}
*/
-- THIS IS FOR ADD A PRODUCT
 INSERT INTO productsbyuser(
  0,
  1
 )

-- https://vercel.com/docs/storage/vercel-postgres/sdk#sql

-- SELECT  FROM productsbyuser ps
-- INNER JOIN products p on ps.id_product=p.id WHERE ps.id_user=0

-- THIS IS THE ONE
SELECT p.*,ps.quantity FROM productsbyuser ps
INNER JOIN products p ON ps.id_product = p.id
WHERE ps.id_user = 0;



--CHECKING 

SELECT * FROM productsbyuser  WHERE  id_user=0 AND  id_product=1


INSERT INTO productsbyuser VALUES(0,1,1) 



UPDATE productsbyuser SET quantity=1  WHERE  id_user=0 AND  id_product=15



DELETE FROM productsbyuser WHERE id_user=0 AND  id_product=1











CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE ratings (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    rate NUMERIC(2, 1) NOT NULL,
    count INT NOT NULL
);

CREATE TABLE productsbyuser(
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
);



DROP TABLE user;
DROP TABLE products;

DROP TABLE productsbyuser;




-- INSERTING DATA



--BEFORE 

/*


CREATE TABLE cartbyuser (
    id_user VARCHAR(255) NOT NULL,
    id_product INT NOT NULL,
    quantity INT,
    total NUMERIC,
    PRIMARY KEY (id_user, id_product),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
);
 
*
/