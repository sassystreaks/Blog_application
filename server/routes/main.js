const express= require("express");
const router = express.Router();
const Post = require('../models/Post');




router.get('', async(req, res)=>{
    try {
        const locals={
            title: "Blog Application",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
        let perPage =6;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) +1;
        const hasNextPage = nextPage <= Math.ceil(count/ perPage);

        res.render('index.ejs', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
        
    } catch (error) {
        console.log(error);   
    }
});


router.get('/post/:id', async(req, res)=>{
    try {

        let slug = req.params.id;
        const data = await Post.findById({ _id: slug});

        const locals={
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('post', {locals, data});
        
    } catch (error) {
        console.log(error);
        
    }

});


router.post('/search', async(req, res)=>{
        
        try {
            const locals={
                title: "NodeJs Blog",
                description: "Simple Blog created with NodeJs, Express & MongoDb."
            }

            let searchTerm = req.body.searchTerm;
            const searchNoSpecialChar =  searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")          
            const data = await Post.find({
                $or : [
                   { title : {$regex: new RegExp(searchNoSpecialChar, 'i')} },
                   { body : {$regex: new RegExp(searchNoSpecialChar, 'i')} },

                ]
            });
            res.render("search",{
                data,
                locals
            });

    } catch (error) {
        console.log(error); 
    }

});

/** 

 * GET /
 * HOME 
*/

















// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"
//         },
//         {
//             title: "Building a Blog", 
//             body: "This is the body text" 
//         },
//         { 
//             title: "Exploring the World of Coding",
//             body: "The journey through programming languages and concepts" 
//         },
//         { 
//             title: "Healthy Habits for a Productive Day", 
//             body: "Routines to boost energy and focus" 
//         },
//         { 
//             title: "The Art of Mindfulness", 
//             body: "Embracing the present moment in a chaotic world" 
//         },
//         { 
//             title: "Designing Your Dream Home", 
//             body: "Creating spaces that reflect your personality" 
//         },
//         { 
//             title: "Navigating the Freelance Life", 
//             body: "Tips for success and balance as a freelancer" 
//         },
//         { 
//             title: "Culinary Adventures: Cooking Around the World", 
//             body: "Recipes and tales from various cuisines" 
//         },
//         { 
//             title: "Exploring the Wonders of Science", 
//             body: "Fascinating discoveries and breakthroughs" 
//         },
//         { 
//             title: "Personal Finance: Smart Money Moves", 
//             body: "Financial strategies for a secure future" 
//         },
//         { 
//             title: "The Power of Positive Thinking", 
//             body: "Shaping a positive mindset for success" 
//         },
//         { 
//             title: "Hiking Trails: Nature's Hidden Gems", 
//             body: "Discovering scenic trails and breathtaking views" 
//         },
//         { 
//             title: "Mastering the Art of Public Speaking", 
//             body: "Techniques for effective communication" 
//         },
//         { 
//             title: "Mind-Body Wellness: A Holistic Approach", 
//             body: "Achieving balance in mental and physical health" 
//         },
//         { 
//             title: "Exploring Art: Beyond the Canvas", 
//             body: "Diving into diverse forms of artistic expression" 
//         },
//         { 
//             title: "The Joy of Reading: Books That Inspire", 
//             body: "Engaging stories and thought-provoking literature" 
//         },
//         { 
//             title: "Travel Memoirs: Adventures Abroad", 
//             body: "Tales of travel experiences and cultural encounters" 
//         },
//         { 
//             title: "Inspiring Creativity: Unleashing Artistic Expression", 
//             body: "Nurturing creativity in everyday life" 
//         },
//     ])
// }
// insertPostData();













router.get('/about', (req, res)=>{
    res.render('about.ejs');
});

router.get('/contact', (req, res)=>{
    res.render('contact.ejs');
});

module.exports= router;