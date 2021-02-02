const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam metus risus, mattis nec sem et, pulvinar porttitor purus. Aliquam sed fringilla erat. Curabitur sit amet finibus orci. Quisque eleifend sapien gravida turpis facilisis suscipit. Aenean eget ornare tellus. Sed et augue quis lorem viverra ultrices. Donec non est orci. Quisque malesuada vel massa vitae sagittis. Maecenas dignissim quam eu blandit molestie. Aenean ligula erat, vestibulum et tristique eu, tempus ut quam. Nunc feugiat urna consectetur ipsum maximus dapibus. Aenean ac molestie turpis. Sed convallis ultrices risus id auctor. Maecenas tincidunt velit ac eros ultricies, nec varius neque pretium.Etiam dapibus in lorem in ornare. Sed faucibus ante a congue euismod. ";
const aboutContent = "Vestibulum id ornare nibh. Donec quis quam id lectus vehicula laoreet. Duis et quam diam. Sed tempus cursus felis, ac porttitor massa sodales non. Suspendisse potenti. Vestibulum molestie nunc id tincidunt porttitor. Aliquam sit amet purus lacinia, pretium diam ut, fringilla eros. Sed molestie eu enim sed dictum.";
const contactContent = "Nullam ut pellentesque nisl. Maecenas nulla ex, tincidunt non iaculis nec, hendrerit sed nibh. Vestibulum at aliquet metus. Donec dui odio, placerat at libero fringilla, consequat luctus erat. Nulla mauris purus, volutpat fermentum nulla vel, tempor vestibulum mauris. Suspendisse lobortis ante tincidunt sodales ornare. Quisque maximus orci tellus, quis commodo nisl dignissim et. Integer nec semper lectus. Ut sed ipsum risus.";

let posts = [];

app.get("/",function(req,res){

    res.render("index",{
        homeCont: homeStartingContent,
        postcont : posts
    });
});

app.get("/about",function(req,res){

    res.render("about",{aboutCont: aboutContent});
});

app.get("/contact",function(req,res){

    res.render("contact",{contactCont: contactContent});
});

app.get("/compose",function(req,res){

    res.render("compose");
});

app.post("/compose",function(req,res){
    const post =
        {
            title : req.body.postTitle,
            content : req.body.postBody
        };

    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postTitle", function(req,res){

    const requestedTitle=  _.lowerCase(req.params.postTitle);

    posts.forEach(function(post){

        const storedTitle = _.lowerCase(post.title);

        if(storedTitle === requestedTitle)
        {
            console.log("Match Found !!!");
        }
        else
        {
            console.log("Not a match...... ;( ");
        }
    });
});

app.listen(3000,function()
{
    console.log("Blogging is running on port 3000. !!!");
});
