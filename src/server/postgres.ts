import { Client } from 'pg';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL
console.log(DATABASE_URL);

export const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();


export function AddNewUser(userDetails: any, ServerResponse: any) {
    client.query(`SELECT * FROM users 
    WHERE email='${userDetails.mailAddress}';`, (err: Error, res: any) => {
            if (err) throw err;
            if (res.rows.length > 0) {
                ServerResponse.send(JSON.stringify("Email already in use"))
            } else {
                client.query(`INSERT INTO users (username,email, password) VALUES ('${userDetails.userName}', '${userDetails.mailAddress}','${userDetails.password}');`, (err: Error, res: any) => {
                    if (err) throw err;

                    ServerResponse.send(JSON.stringify("User Added successfully"));
                })
            }
        })
}

// @ts-ignore
async function initDb() {

    //* creating new tables *//

    await client.query(
        `CREATE TABLE IF NOT EXISTS mansuit(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes TEXT[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS womansuit(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes TEXT[] NOT NULL,
          image TEXT NOT NULL);`
    );
    await client.query(
        `CREATE TABLE IF NOT EXISTS boogi(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS sup(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS soft(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price NUMERIC NOT NULL,
          info TEXT NOT NULL,
          sizes NUMERIC[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS accessories(
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          info TEXT NOT NULL,
          sizes INTEGER[] NOT NULL,
          image TEXT NOT NULL);`
    );

    await client.query(
        `
        CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL);
        `
    )

    // * here i'm pushing new products to my DB *//



    //     await client.query(
    // `INSERT INTO boogi (title,price,info,sizes,image) VALUES
    // ('MOON LENCE 2 PC Body Board Body Board with Slick Bottom Surfing for Kids Teens and Adults',55, 'High Quality and Strong Material：This waterproof bodyboard is weather-resistant and has good impact resistance. Due to the durable EPS core, it will not break or deform easily. The bottom is very smooth, which will increase speed and greatly reduce the friction while surfing.', '{33,34,37,32}','https://m.media-amazon.com/images/I/71Al7zmWpcL._AC_SX522_.jpg')
    //   , ('Woddtery Lightweight Bodyboard - Woddtery Lightweight Bodyboard',29, 'TRUSTWORTHY SURFBOARD: It comes with a high-density HDPE slick, a comfort EPS foam core and XPE deck, it has strong buoyancy and load-bearing capacity. Equipped 60/40 rails, 2 rear channels, and a crescent tail, made to endure all spin drift conditions, easy to control and increase your speed and strength. You can Prone, Stand-up or Ride Kneeling Down to meet your different needs.', '{31,33,34,36}','https://m.media-amazon.com/images/I/610kkFw4HlL._AC_SX466_.jpg')
    //   ,('37" Body Board Boogie Boards for Beach with Wrist Leash Bodyboard',29,'★37"Body Board★ - Our Body Board Lightweight with EPS Core, which is light in weight, high in buoyancy, and has a high load-bearing capacity of about 110 lbs. Make it easier and more enjoyable for you to surf and play. ★Upgraded bodyboard★——With high-strength traction rope, it improves the good traction feeling and effectively ensures the stability of surfing. The crescent sink design can effectively increase the sliding distance and speed. It is very suitable for beginners, teenagers and adults, making surfing easy to learn.','{37,35,39}','https://m.media-amazon.com/images/I/61J4Xg-SfdL._AC_SX522_.jpg')
    //   ,('Bo-Toys Body Board Lightweight with EPS Core',35,'33" board, Stylish design, bright colors (red, blue and pink) for you to choose , offer best surfing fun. Ready for hours of fun at the beach, river, or water-park. TOTAL ASSURANCE - When you receive a Bo Toys product, if you are not 100% satisfied with your purchase, let us know. We will respond promptly and professionally in order to fix any problems the product may have, if you received a faulty item, we will replace it immediately.','{33,32,35,34}','https://images-na.ssl-images-amazon.com/images/I/71gwzwytuIL.__AC_SX300_SY300_QL70_FMwebp_.jpg')
    //   ,('BIGFEIJI Bodyboards 33in/37in/41in Lightweight Body Board',35,'【Durable Materials & New Technology】Our Bodyboard made of ultralight EPS core with thickens XPE deck and HDPE bottom, the body board is 2.1in ​thick for strong buoyancy, not easily deformed, lightweight and easy to carry; New bonding process better prevents bulging for longer service life.','{33,34}','https://m.media-amazon.com/images/I/71ShCPbgGlL._AC_SX522_.jpg')
    //   ,('Wavestorm Foam Bodyboard 40" | Bodyboards Recreational Beginners All Surfing Levels | Contoured Deck and Channel Bottom ',29,'The Wavestorm 40in bodyboard dimensions are 40" L x 20.25" W x 2.175" Thick | Weight is 1.8lbs | Volume at 6.55 Liters | Recommended weight capacity at 180lbs. The board comes with a wrist leash. Excellent for youth to adult. Buoyant and rigid enough for performance wave riding.','{33,34,37}','https://m.media-amazon.com/images/I/817AzYlMnRL._AC_SX522_.jpg')
    //   ,('WOOWAVE Bodyboard 33-inch/36-inch/41-inch Super Lightweight Body Board',89,'【DURABLE CONSTRUCTION AND LIGHTWEIGHT】The WOOWAVE Body Board is super light, comes with coiled wrist leash, features a high speed HDPE slick bottom surface and EPS core for great performance, offers impact strength durability, buoyancy and increase speeds.','{33,34,37,32}','https://m.media-amazon.com/images/I/81CKN6XE6eL._AC_SX522_.jpg')
    //   ,('Bodyboard 37" Boogie Boards for Beach, Lightweight Body Board',13,'【Premium Durable Material】Made with premium EPS core material to provide durability, strength and buoyancy. Covered with XPE deck, the bodyboard is waterproof and has good impact resistance. HDPE smooth bottom provides speed, performance and maneuverability.','{27,25,34,30}','https://m.media-amazon.com/images/I/717vuU4qdYL._AC_SX522_.jpg')
    //   ,('YOOHO Bodyboard 33 inch/37 inch/41 inch Super Lightweight Premium Body Board',46,'🌊【Why Chooice Our Bodyboard】The lightweight makes it easy to carry, the HDPE slick bottom increases high speed and strong buoyancy, And due to the durable EPS core, It is not easily deformed and faded and can be used for a long time.','{33,34,37,32,35}','https://m.media-amazon.com/images/I/61zqYoJIIiL._AC_SX522_.jpg')
    //   ,('KONA SURF CO. Sumo Body Board Lightweight Soft Foam Top Boogie Bodyboard',49,' The Sumo is a great item to take to the beach and fits most adult riders. Available in 48 or 50 inch and built from quality materials. This board is light, durable, and fun!','{43,42,45}','https://m.media-amazon.com/images/I/91wPvc9KIKL._AC_SX522_.jpg')
    //   ,('Bo-Toys Body Board Lightweight with EPS Core',65,'Body Board Lightweight with EPS core, Heat lamination Technology, offers impact strength durability, Lightweight & Rigid. More maneuverability, and increased speeds and strength.','{33,35,37}','https://m.media-amazon.com/images/I/71Psx0xQOWL._AC_SX522_.jpg');`)


    //  await client.query(
    //      `INSERT INTO sup (title,price,info,sizes,image) VALUES
    //       ('SereneLife Inflatable Stand Up Paddle Board (6 Inches Thick) with Premium SUP',390,'Best paddling manoeuvrability: outfitted with triple bottom panel fins, steering & handling The stand up inflatable paddle boards is incredibly easy offering exceptional surf control, youll be gliding & skimming the water like a sea creature','{12}','https://m.media-amazon.com/images/I/71v787HsNLL._AC_SX522_.jpg')
    //      ,('Premium SUP Accessories & Carry Bag',282,'measuring 10.6 feet long & 32 inches wide, balancing & stabilizing on top of our SUP board is a breeze, These board can be used in the ocean, fresh water lakes, and rivers.','{10,11}','https://m.media-amazon.com/images/I/81fJNCSNeSL._AC_SX522_.jpg')
    //      ,('FBSPORT Premium Inflatable Stand Up Paddle Board, Yoga Board with Durable SUP Accessories & Carry Bag',199,'WIDE AND LIGHTWEIGHT SUP DESIGN - Size of stand up paddling board, 10 long and 31'' of deck width, for improved stability and balance while standing.with high pressure applied (15 psi) makes this board highly stable and suitable.','{10,11}','https://m.media-amazon.com/images/I/71Bf6ue+3YS._AC_SX522_.jpg')
    //      ,('ADVENOR Paddle Board 11X33 x6 Extra Wide Inflatable Stand Up Paddle Board',399,'EXTRA WIDE AND LONGER DESIGN FOR BETTER BALANCE Premium inflatable paddle board with non-slip EVA deck pad is made of high quality material that can able to withstand high pressure.33 inches width board provided great stability.','{11,12}','https://m.media-amazon.com/images/I/71hxe7FO4lS._AC_SX522_.jpg')
    //      ,('Everymile Inflatable Paddle Board All-Around Stand Sup',129,'Materials - Paddle board is made of the highest quality military grade PVC material.Non-slip deck pad is comfortable under the feet and provides extra grip and traction.Providing the most durable lightweight board on the market.','{9,10,14}','https://m.media-amazon.com/images/I/71lp5cQFQdL._AC_SX522_.jpg')       
    //      ,('Peakpath Inflatable Stand Up Paddle Board (6 Thick) with Premium SUP',380,'Inflatable paddle boards is made of military grade material drop stitch PVC core interior fabric,providing the most durable lightweight board on the market,make the board more durable,stable and better withstand pressure,weight limit up to 330 pounds. Paddle boards with soft EVA allow your feet to remain comfortable no matter how long a paddle practice.','{12,11,10}','https://m.media-amazon.com/images/I/51aO5pc7fUL._AC_SX522_.jpg')
    //      ,('Masterish Inflatable Stand Up Paddle Board',200,' Include premium backpack, floatable aluminum paddle, GRI high-pressure hand pump, leash, repair kit and a removable US fin box which fits different size fins, waterproof cell phone case, waterproof bag for storage of anything you want to take along. You dont need to spend extra money for these accessories, just go paddling now!','{11}','https://m.media-amazon.com/images/I/61YJlVl76TL._AC_SX522_.jpg')
    //      ,('SereneLife Inflatable Stand Up Paddle Board',280,'An extra-wide 34 makes MYBOAT SUP inflatable paddle board the most stable paddle board on the market. Its easy for beginners to stand up and balance on the SUP board. The wide no-slip deck and performance shape make for fast, fun paddling for all skill levels, perfect for using the ocean, lakes and rivers. You can also fishing on the paddle board. It is an ideal all round paddle board for adults, teens, youth and with pets of all skill levels.','{10}','https://m.media-amazon.com/images/I/91J58vt8neL._AC_SX522_.jpg')
    //      ,('Roc Paddle Boards Inflatable Paddleboard Pack W/ Heavy Duty Comfort Backpack, Paddle, Non-Slip Deck Pad, Waterproof Bag, Safety Leash, Main Fin and a Dual',222,'Our extra wide design creates an incredible all-around board for riders of all skill levels. These kits can be used in the ocean, freshwater lakes, and rivers. Our board is an industry-leading weight of only 17.5 pounds—thats 20% lighter than competitors. Board dimensions are 10 long by 33 wide and 6 thick with a weight limit of 350 pounds. Pets love them too','{10,12,13}','https://m.media-amazon.com/images/I/71WtJOW1vYL._AC_SX522_.jpg')
    //         `
    //     );

    // await client.query(
    //     `INSERT INTO womansuit (title,price,info,sizes,image) VALUES
    //          ('Akaeys Womens Full Body Swimsuit Rash Guard One Piece Long Sleeve',29,'Fabric TypeSpandex,Nylon','{xs,s}','https://m.media-amazon.com/images/I/61SiCXNdrWL._AC_UY500_.jpg')
    //         ,('Full Body Wetsuit Surfing Diving Suit Scuba Dive Skin Rash Guard',39,'Ironman & USAT Approed','{xs,m,l,xl}','https://m.media-amazon.com/images/I/61kBp475ktL._AC_SY550_.jpg')
    //         ,('FEOYA One Piece Swimsuit Long Sleeve Full Body Swim: Feoya full body dive skins made with Spandex & Nylon to give you a extremely soft breathable and lightweight feelings it is super comfortable to close skins and smooth naturally form fitting to reduce drag in the water offer you a happy snorkeling and surfing experience.war Rash Guard with Sun Protection',53,'Material - Premium quick-drying, breathable, moisture wicking fabric for all-day comfort,Four-way stretch material enhances the range of motion.','{xs,m,l}','https://m.media-amazon.com/images/I/614jvpajfNS._AC_UY500_.jpg')
    //         ,('MakeMeChic Womens Colorblock Zip Up One Piece Swimsuit Sporty Bathing Set',33,'Soft with Good Elasticity, Comfy to Wear.','{m,l,xl,xxl}','https://m.media-amazon.com/images/I/618FszdRuNL._AC_UY500_.jpg')
    //         ,('MakeMeChic Sporty Bathing Set',57,'Fabric Type - 82% Polyester, 18% Elastane','{l}','https://m.media-amazon.com/images/I/51bem6cUUvL._AC_SY500._SX._UX._SY._UY_.jpg')
    //         ,('Micosuza Swimsuit for Women Design One Piece Long-Sleeve Surfing Suit',120,'Closure TypeZipper','{xs,xl,xxl}','https://m.media-amazon.com/images/I/51EslEeH8sL._AC_UY500_.jpg')
    //         ,('Casual Color Block Fashion Long Long Sleeve Swimsuit Sports Surfing Bathing Suit',390,'Fabric - Type82% Nylon, 18% Spandex','{l,xl,xxl,xxxl}','https://m.media-amazon.com/images/I/61Nu3-VxVWL._AC_UY500_.jpg')
    //         ,('YATEEN Women Rash Guard Long Sleeve One Piece Swimsuit Surfing Bathing Suit UPF 50+ Athletic Swimwear',34,'Zipper on the chest or back for easy opening and closure, long sleeve one piece swimsuit sun protection.','{xxs,s,l,xl,xxl}','https://m.media-amazon.com/images/I/71AtddUQbDL._AC_UY500_.jpg')
    //         ,('Roxy Womens Whole Hearted Long Sleeve UPF 50 Rashguard',68,'Fabric Type - 92.0% Polyester, 8% Elastane','{xl,xxl,xxxl}','https://m.media-amazon.com/images/I/61zae-SELlL._AC_UY500_.jpg');`
    //     );

    //      await client.query(
    //          `INSERT INTO mansuit (title,price,info,sizes,image) VALUES
    //           ('Rash Guard UPF 50+ UV Sunprotection for Men Women Full Body Diving Suit',239,'Fabric Type - Lycra UV Protection Long Sleeves Sports Dive Skins for Running, Exercising, Snorkeling, Swimming, Spearfishing & Other Water Sports','{xs,s,l,xl,xxl}','https://m.media-amazon.com/images/I/61fQwHpPlJL._AC_UX466_.jpg')
    //          ,('Ravani Mens Wetsuit surf',45,'One-Piece Wetsuit, Pursuing The Ultimate Wearing Experience - We try to combine all the small separated pieces neoprene into one piece, and use the least sewing thread to sew the wetsuits for men, the purpose is to maximize the performance of the mens wetsuit Elasticity and showing the figure, so that the wetsuits for men in cold water can be fully close to your skin without feeling tight','{xs,s,l,xl,xxl}','https://m.media-amazon.com/images/I/61D1DjELzQL._AC_SX522_.jpg')
    //          ,('Mens 3mm Shorty Wetsuit',60,'This shorty wetsuit men is specially designed for water sports and water aerobics','{xs,s,l,xl}','https://m.media-amazon.com/images/I/61QYjoOIxLL._AC_SX522_.jpg')
    //          ,('Dizokizo 5mm Wetsuits for Men',239,'Heavy-duty metal back zipper effectively prevents 3mm mens wetsuit turning unzipped.','{xs,s,l,xl,xxl}','https://m.media-amazon.com/images/I/61Tjn0xVm2S._AC_SX522_.jpg')
    //          ,('ZCCO Mens Wetsuit Ultra Stretch 5mm Neoprene Swimsuit',239,'【Specific fitting design for you】Our diving suits are made of premium neoprene, primarily providing thermal insulation, Buoyancy, UV protection, wear protection, and the bite of marine life.','{xs,s,l,xxl}','https://m.media-amazon.com/images/I/51x8Vo5AGFL._AC_SX522_.jpg')
    //          ,('Ho Stevie! Mens Surfing Wetsuit - Chest Zip Fullsuit ',70,'','{xs,s,xl,xxl}','Ho Stevie! Mens Surfing Wetsuit - Chest Zip Fullsuit')
    //          ,('OMGear Wetsuit Women Men 2mm Neoprene Dive Shorty Wet Suit Thermal Short Sleeve Swimsuit',80,'High quality material: 90% neoprene + 10% stretchy nylon','{xs,l,xl,xxl}','https://m.media-amazon.com/images/I/71sRV9U8UqS._AC_SX522_.jpg')
    //          ,('REALON Wetsuit Men',90,'Surfing suit with stretchy materials comfortable enough for all day wear','{l,xl,xxl}','https://m.media-amazon.com/images/I/614XppWmkCL._AC_SX522_.jpg')
    //          ,('Shorty Wetsuit',70,'This shorty wetsuit men is specially designed for water sports and water aerobics','{xs,s,l,xxl}','https://m.media-amazon.com/images/I/618uod499CL._AC_SX522_.jpg');`
    //      );

    // ('Catch Surf Odysea Skipper Quad Shortboard',299,'Catch Surf is a Soft Surfboards, clothes and accessories brand. Created in 2007 the Catch Surf boards have pioneered and led the soft surfboards movement for the last 10 years.','{6.5}','https://m.media-amazon.com/images/I/81IY3ub1OTL._AC_SY550_.jpg')
    // await client.query(
    //      `INSERT INTO soft (title,price,info,sizes,image) VALUES
    //     ('Ocean & Earth Softboard',204.99,'Straight from the line up to the mosh pit. A Summer Festival inspired Softboard range between O&E and Jack Irvine','{5.6}','https://m.media-amazon.com/images/I/51RDTebiOLL._AC_SX522_.jpg')
    //     ,('Boardworks Froth  Soft Top Surfboard  Wakesurf Board ',290,'Created for fun and versatility with generous volume','{5.6}','https://m.media-amazon.com/images/I/81ODOpyJIZL._AC_SX522_.jpg')
    //     ,('Modern Surfboards Highline PU Surfboard',599.00,'The Modern Surfboards Highline PU Surfboard offers an easier ride for novice-to-intermediate surfers to help them develop their skills more quickly and maximize enjoyment.','{6.2,6.4,6.8}','https://m.media-amazon.com/images/I/41NxDaYs9yL._AC_SX522_.jpg')
    //     ,('The Critical Slide Society Angler Shortboard Surfboard',639.95,'After slipping into our wetsuit we grab our Angler Shortboard Surfboard and paddle out. This twin fin situates its generous volume under the chest to make it easier to catch medium-sized waves. Once we are on top of the wave we can trust the rocker profile and vee to single concave base to help us drop in with confidence.','{5.11,5.8,6.3}','https://m.media-amazon.com/images/I/41J7ZFbr4zL._AC_SX522_.jpg')
    //     ,('Modern Surfboards Falcon PU Surfboard',720.00,'etting a new benchmark in the funboard category, Modern made the Falcon PU Surfboard to offer a stable and buoyant option that helps us beginner-to-intermediate surfers progress quickly.','{6}','https://m.media-amazon.com/images/I/31zV3xFlIwL._AC_SX425_.jpg')
    //     ,('Salt Gypsy Shorebird Surfboard',980.99,'The Shorebird is designed to help women surf at the peak of their potential on powerful waves and prime time conditions. ','{5.11,5.6}','https://m.media-amazon.com/images/I/51z9kMrBnoL._AC_SX522_.jpg')
    //     ,('NSP The CSE Cheater Surfboard',289.99,'Designed with a rocker that makes learning the basics easy while giving ample space to perfect your technique, this one board wonder is a great choice for beginners and seasoned surfers alike.','{8,7.6}','https://m.media-amazon.com/images/I/418KE82Tn9S._AC_SX522_.jpg')
    //     ,('O&E Ocean and Earth The Bug Mini Softboard',560.99,'Looking for a board to start the grommet on early? The Bug Mini SoftBoard Surfboard is the perfect introduction to the waves with a soft, durable deck and soft PU fins.','{6.11}','https://m.media-amazon.com/images/I/719rjxmfUzL._AC_SX522_.jpg');`
    // );




    await client.end()
}
    // initDb(); //create the tables