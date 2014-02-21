if (!myApp) {
    console.log("mocked app not set");
}

myApp.run(function($httpBackend) {
    var player = {
        countryFlagURL: "http://www.singpath.com/static/flags/sg_on.png",
        gender: "male",
        isoYear: 2010,
        countryCode: "SG",
        tags: ["SMU", "hackerspacesg"],
        country: "Singapore",
        yearOfBirth: 1985,
        about: "I love Scifi",
        isoDay: 5,
        isoWeek: 6,
        isAdmin: true,
        gravatar: "http://www.gravatar.com/avatar/6e64bb2cab5367fd6e201df2aa722512/?default=&amp;s=80",
        location: "Singapore",
        rankings: [],
        player_id: 57754,
        professional: "1",
        nickname: "Chris",
        badges: []
    },
        stories = [{
            "archived": false,
            "name": "The Spy Who Coded",
            "videos": ["LL-9dh31lO8", "wforb_EBcNc", "rlcYdRBC4CY", "s_4FHdYa8vg", "23Fv44Qra8Y", "uSL9dck1irQ", "atd-_akntnI", "C3fpgXP5JgU", "17YvG9zGPkc", "k__8ueUkWVw", "ly65Zf2Ak_s"],
            "created": "2013-04-01T10:36:11.005830",
            "image": "img/story/The_Spy_Who_Coded.jpg",
            "supported_paths": [],
            "editor": 57504,
            "published": true,
            "id": 14611860,
            "description": "A first person coder starring Christian and Shannon Boesch"
        }, {
            "archived": false,
            "name": "Tricorder Meltdown",
            "videos": ["LL-9dh31lO8", "wforb_EBcNc", "rlcYdRBC4CY", "s_4FHdYa8vg", "23Fv44Qra8Y", "uSL9dck1irQ", "atd-_akntnI", "C3fpgXP5JgU", "17YvG9zGPkc", "k__8ueUkWVw", "ly65Zf2Ak_s"],
            "created": "2013-04-03T03:58:35.784920",
            "image": "http://img.youtube.com/vi/LL-9dh31lO8/1.jpg",
            "supported_paths": [],
            "editor": 57504,
            "published": false,
            "id": 14972890,
            "description": "A first person coder starring Christian and Shannon Boesch"
        }, {
            "archived": false,
            "name": "Texas Whirlwind",
            "videos": ["LL-9dh31lO8", "wforb_EBcNc", "rlcYdRBC4CY", "s_4FHdYa8vg", "23Fv44Qra8Y", "uSL9dck1irQ", "atd-_akntnI", "C3fpgXP5JgU", "17YvG9zGPkc", "k__8ueUkWVw", "ly65Zf2Ak_s"],
            "created": "2013-04-03T03:58:58.489010",
            "image": "http://img.youtube.com/vi/LL-9dh31lO8/1.jpg",
            "supported_paths": [],
            "editor": 57504,
            "published": false,
            "id": 15162769,
            "description": "A first person coder starring Christian and Shannon Boesch"
        }, {
            "archived": false,
            "name": "My First Story",
            "videos": ["oBHbkDxhGfo", "xnL0nPCjXJk"],
            "created": "2013-07-16T09:10:51.331900",
            "image": "http://img.youtube.com/vi/oBHbkDxhGfo/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 21383571,
            "description": "Testing my story creation"
        }, {
            "archived": true,
            "name": "My First Story",
            "videos": ["oBHbkDxhGfo", "xnL0nPCjXJk"],
            "created": "2013-07-16T09:11:23.217950",
            "image": "http://img.youtube.com/vi/oBHbkDxhGfo/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 21383572,
            "description": "Testing my story creation"
        }, {
            "archived": false,
            "name": "hha",
            "videos": [],
            "created": "2013-07-16T11:31:57.465170",
            "image": null,
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21452624,
            "description": "sakd"
        }, {
            "archived": false,
            "name": "hha",
            "videos": [],
            "created": "2013-07-16T11:32:09.089240",
            "image": null,
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21453611,
            "description": "sakd"
        }, {
            "archived": false,
            "name": "hha",
            "videos": [],
            "created": "2013-07-16T11:32:03.978550",
            "image": null,
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21454615,
            "description": "sakd"
        }, {
            "archived": true,
            "name": "My First Story",
            "videos": ["xnL0nPCjXJk", "oBHbkDxhGfo"],
            "created": "2013-07-16T09:10:45.298690",
            "image": "http://img.youtube.com/vi/xnL0nPCjXJk/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 21455574,
            "description": "Testing my story creation"
        }, {
            "archived": false,
            "name": "testing my story",
            "videos": ["4a2qt051S04", "4oWVXTeXvcY"],
            "created": "2013-07-16T11:37:48.507960",
            "image": "http://img.youtube.com/vi/4a2qt051S04/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 21455626,
            "description": "my first story"
        }, {
            "archived": false,
            "name": "hha",
            "videos": ["P8rmJIuHCeU", "UnBeeG-Gv-k", "UnBeeG-Gv-k"],
            "created": "2013-07-16T11:32:47.559950",
            "image": "http://img.youtube.com/vi/P8rmJIuHCeU/1.jpg",
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21460613,
            "description": "sakd"
        }, {
            "archived": false,
            "name": "hha",
            "videos": [],
            "created": "2013-07-16T11:31:52.331150",
            "image": null,
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21461611,
            "description": "sakd"
        }, {
            "archived": false,
            "name": "My First Story",
            "videos": ["xnL0nPCjXJk", "oBHbkDxhGfo"],
            "created": "2013-07-16T09:10:50.924040",
            "image": "http://img.youtube.com/vi/xnL0nPCjXJk/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 21462572,
            "description": "Testing my story creation"
        }, {
            "archived": false,
            "name": "hha",
            "videos": ["P8rmJIuHCeU", "UnBeeG-Gv-k", "UnBeeG-Gv-k"],
            "created": "2013-07-16T11:33:04.649820",
            "image": "http://img.youtube.com/vi/P8rmJIuHCeU/1.jpg",
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 21464604,
            "description": "sakd"
        }, {
            "archived": false,
            "name": "d",
            "videos": [],
            "created": "2013-07-16T12:20:23.575260",
            "image": null,
            "supported_paths": [],
            "editor": 9341208,
            "published": false,
            "id": 21469580,
            "description": "d"
        }, {
            "archived": false,
            "name": "hi country",
            "videos": ["DJGSbWpoQJ4"],
            "created": "2013-08-09T12:35:34.845920",
            "image": "http://img.youtube.com/vi/DJGSbWpoQJ4/1.jpg",
            "supported_paths": [],
            "editor": 12037316,
            "published": false,
            "id": 5118168645238784,
            "description": "hi"
        }, {
            "archived": false,
            "name": "rj st",
            "videos": ["gWDgTAIPXC4"],
            "created": "2013-08-05T02:43:58.995220",
            "image": "http://img.youtube.com/vi/gWDgTAIPXC4/1.jpg",
            "supported_paths": [],
            "editor": 6910717,
            "published": false,
            "id": 5458332202565632,
            "description": "rj st"
        }, {
            "archived": false,
            "name": "Introduction to Ruby",
            "videos": ["vHcmJ0jUiME", "R37t1v3_c9k"],
            "created": "2013-08-13T08:56:03.404090",
            "image": "http://img.youtube.com/vi/vHcmJ0jUiME/1.jpg",
            "supported_paths": [2462233],
            "editor": 57754,
            "published": true,
            "id": 5625116520087552,
            "description": "Shannon introduces the basics of Ruby."
        }, {
            "archived": false,
            "name": "Introduction to Python",
            "videos": ["vHcmJ0jUiME", "R37t1v3_c9k"],
            "created": "2013-08-10T03:37:16.512790",
            "image": "http://img.youtube.com/vi/vHcmJ0jUiME/1.jpg",
            "supported_paths": [6920762, 10030],
            "editor": 57754,
            "published": true,
            "id": 5786345297412096,
            "description": "Shannon introduces the basics of Python."
        }, {
            "archived": false,
            "name": "Introduction to Javascript",
            "videos": ["vHcmJ0jUiME", "R37t1v3_c9k"],
            "created": "2013-08-13T08:55:10.055810",
            "image": "http://img.youtube.com/vi/vHcmJ0jUiME/1.jpg",
            "supported_paths": [2473247],
            "editor": 57754,
            "published": true,
            "id": 6245146588872704,
            "description": "Shannon introduces the basics of Javascript."
        }, {
            "archived": false,
            "name": "Python Tutorial",
            "videos": ["7IkZQyQ36Io"],
            "created": "2013-08-09T06:30:40.963960",
            "image": "http://img.youtube.com/vi/7IkZQyQ36Io/1.jpg",
            "supported_paths": [],
            "editor": 57754,
            "published": false,
            "id": 6462527768625152,
            "description": "Christian and Shannon introduce the basic concepts of Python"
        }, {
            "archived": false,
            "name": "Introduction to Java",
            "videos": ["vHcmJ0jUiME"],
            "created": "2013-08-14T05:57:32.639900",
            "image": "http://img.youtube.com/vi/vHcmJ0jUiME/1.jpg",
            "supported_paths": [2243213],
            "editor": 57754,
            "published": true,
            "id": 6539480697667584,
            "description": "Introduction to Java"
        }, {
            "archived": true,
            "name": "meeting test 123",
            "videos": ["v5Ai5C5VZuo", "NHZP3sQgGiw"],
            "created": "2013-08-03T03:09:29.390930",
            "image": "http://img.youtube.com/vi/v5Ai5C5VZuo/1.jpg",
            "supported_paths": [],
            "editor": 9341208,
            "published": false,
            "id": 6680533866119168,
            "description": "meeting test"
        }, {
            "archived": false,
            "name": "Testing",
            "videos": ["_jC-4ucEgUQ"],
            "created": "2013-08-12T02:51:04.497840",
            "image": "http://img.youtube.com/vi/_jC-4ucEgUQ/1.jpg",
            "supported_paths": [],
            "editor": 13031274,
            "published": false,
            "id": 6718999593222144,
            "description": "testing 1"
        }];

    $httpBackend.whenGET(/^partials/).passThrough();
    $httpBackend.whenPOST('/jsonapi/contribute_problem').passThrough();
    $httpBackend.whenPOST('/jsonapi/log_event').respond(function(_, __, data) {
        return [200, JSON.parse(data)];
    });
    $httpBackend.whenPOST('/jsonapi/feedback').passThrough();

    $httpBackend.whenGET('/jsonapi/player').respond(player);
    $httpBackend.whenGET('/jsonapi/mobile_paths').respond([{
        "pathModified": "2011-05-18 08:40:46.845609",
        "name": "Beginner Obj-C",
        "price": 0.0,
        "free": true,
        "number_of_problemsets": 6,
        "path_id": 7520056,
        "purchased": false,
        "number_of_problems": 4,
        "number_of_solved_problems": 3,
        "description": "Beginner Path for Objective-C"
    }, {
        "pathModified": "2012-05-22 03:51:12.291919",
        "name": "Beginner Python",
        "price": 0.0,
        "free": true,
        "number_of_problemsets": 9,
        "path_id": 6920762,
        "purchased": false,
        "number_of_problems": 101,
        "number_of_solved_problems": 101,
        "description": "Beginner Python"
    }, {
        "pathModified": "2012-08-29 02:45:43.079114",
        "name": "Beginner Javascript",
        "price": 0.0,
        "free": true,
        "number_of_problemsets": 6,
        "path_id": 12605566,
        "purchased": false,
        "number_of_problems": 58,
        "number_of_solved_problems": 0,
        "description": "Beginner Javascript Path"
    }, {
        "pathModified": "2012-08-29 07:40:01.039161",
        "name": "Beginner Ruby",
        "price": 0.0,
        "free": true,
        "number_of_problemsets": 6,
        "path_id": 8277128,
        "purchased": false,
        "number_of_problems": 73,
        "number_of_solved_problems": 1,
        "description": "Beginner Ruby Path"
    }, {
        "pathModified": "2012-08-29 02:53:32.616533",
        "name": "Beginner Java",
        "price": 0.0,
        "free": true,
        "number_of_problemsets": 6,
        "path_id": 8113761,
        "purchased": false,
        "number_of_problems": 65,
        "number_of_solved_problems": 22,
        "description": "Beginner Java Path"
    }]);
    $httpBackend.whenGET('/jsonapi/tags').respond();

    $httpBackend.whenGET('/jsonapi/get_game_paths').respond({
        "paths": [{
            "description": "Java game path",
            "id": 2243213,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/java/j001_on.png",
                "description": "Java Level 1 Badge",
                "id": 2595052,
                "name": "Level 1"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j002_on.png",
                "description": "Java Level 2 Badge",
                "id": 2552050,
                "name": "Level 2"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j003_on.png",
                "description": "Java Level 3 Badge",
                "id": 2577055,
                "name": "Level 3"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j004_on.png",
                "description": "Java Level 4 Badge",
                "id": 2631011,
                "name": "Level 4"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j005_on.png",
                "description": "Java Level 5 Badge",
                "id": 2574074,
                "name": "Level 5"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j006_on.png",
                "description": "Java Level 6 Badge",
                "id": 2578065,
                "name": "Level 6"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j007_on.png",
                "description": "Java Level 7 Badge",
                "id": 2573073,
                "name": "Level 7"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j008_on.png",
                "description": "Java Level 8 Badge",
                "id": 2590065,
                "name": "Level 8"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j009_on.png",
                "description": "Java Level 9 Badge",
                "id": 2550060,
                "name": "Level 9"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j010_on.png",
                "description": "Java Level 10 Badge",
                "id": 2589070,
                "name": "Level 10"
            }, {
                "url": "http://www.singpath.com/static/badges/java/j011_on.png",
                "description": "Java Level 11 Badge",
                "id": 2604065,
                "name": "Level 11"
            }],
            "name": "Java"
        }, {
            "description": "Javascript Game Path",
            "id": 2473247,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/javascript/js001_on.png",
                "description": "Javascript Level 1 Badge",
                "id": 3313007,
                "name": "Level 1"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js002_on.png",
                "description": "Javascript Level 2 Badge",
                "id": 3202072,
                "name": "Level 2"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js003_on.png",
                "description": "Javascript Level 3 Badge",
                "id": 3235086,
                "name": "Level 3"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js004_on.png",
                "description": "Javascript Level 4 Badge",
                "id": 3282091,
                "name": "Level 4"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js005_on.png",
                "description": "Javascript Level 5 Badge",
                "id": 3206086,
                "name": "Level 5"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js006_on.png",
                "description": "Javascript Level 6 Badge",
                "id": 3277080,
                "name": "Level 6"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js007_on.png",
                "description": "Javascript Level 7 Badge",
                "id": 3259076,
                "name": "Level 7"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js008_on.png",
                "description": "Javascript Level 8 Badge",
                "id": 3217062,
                "name": "Level 8"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js009_on.png",
                "description": "Javascript Level 9 Badge",
                "id": 3292016,
                "name": "Level 9"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js010_on.png",
                "description": "Javascript Level 10 Badge",
                "id": 3295005,
                "name": "Level 10"
            }, {
                "url": "http://www.singpath.com/static/badges/javascript/js011_on.png",
                "description": "Javascript Level 11 Badge",
                "id": 3212074,
                "name": "Level 11"
            }],
            "name": "Javascript"
        }, {
            "description": "Python game path",
            "id": 10030,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p001_on.png",
                "description": "Python Level 1 Badge",
                "id": 87572,
                "name": "Level 1"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p002_on.png",
                "description": "Python Level 2 Badge",
                "id": 88541,
                "name": "Level 2"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p003_on.png",
                "description": "Python Level 3 Badge",
                "id": 87573,
                "name": "Level 3"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p004_on.png",
                "description": "Python Level 4 Badge",
                "id": 88542,
                "name": "Level 4"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p005_on.png",
                "description": "Python Level 5 Badge",
                "id": 92683,
                "name": "Level 5"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p006_on.png",
                "description": "Python Level 6 Badge",
                "id": 549028,
                "name": "Level 6"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p007_on.png",
                "description": "Python Level 7 Badge",
                "id": 515027,
                "name": "Level 7"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p008_on.png",
                "description": "Python Level 8 Badge",
                "id": 508029,
                "name": "Level 8"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p009_on.png",
                "description": "Python Level 9 Badge",
                "id": 2264210,
                "name": "Level 9"
            }, {
                "url": "http://www.singpath.com/static/badges/python/p010_on.png",
                "description": "Python Level 10 Badge",
                "id": 8125949,
                "name": "Level 10"
            }],
            "name": "Python"
        }, {
            "description": "R Game Path",
            "id": 11835808,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/r/r001_on.png",
                "description": "R Level 1 Badge",
                "id": 11849268,
                "name": "Level 1"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r002_on.png",
                "description": "R Level 2 Badge",
                "id": 12207680,
                "name": "Level 2"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r003_on.png",
                "description": "R Level 3 Badge",
                "id": 12194168,
                "name": "Level 3"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r004_on.png",
                "description": "R Level 4 Badge",
                "id": 12204079,
                "name": "Level 4"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r005_on.png",
                "description": "R Level 5 Badge",
                "id": 12200084,
                "name": "Level 5"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r006_on.png",
                "description": "R Level 6 Badge",
                "id": 12197129,
                "name": "Level 6"
            }, {
                "url": "http://www.singpath.com/static/badges/r/r007_on.png",
                "description": "R Level 7 Badge",
                "id": 12195118,
                "name": "Level 7"
            }],
            "name": "R"
        }, {
            "description": "Ruby Game Path",
            "id": 2462233,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/ruby/r001_on.png",
                "description": "Ruby Level 1",
                "id": 3251069,
                "name": "Level 1"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r002_on.png",
                "description": "Ruby Level 2",
                "id": 3222057,
                "name": "Level 2"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r003_on.png",
                "description": "Ruby Level 3 Badge",
                "id": 3467085,
                "name": "Level 3"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r004_on.png",
                "description": "Ruby Level 4 Badge",
                "id": 3536063,
                "name": "Level 4"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r005_on.png",
                "description": "Ruby Level 5 Badge",
                "id": 3454078,
                "name": "Level 5"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r006_on.png",
                "description": "Ruby Level 6 Badge",
                "id": 3428079,
                "name": "Level 6"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r007_on.png",
                "description": "Ruby Level 7 Badge",
                "id": 3490101,
                "name": "Level 7"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r008_on.png",
                "description": "Ruby Level 8 Badge",
                "id": 3532088,
                "name": "Level 8"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r009_on.png",
                "description": "Ruby Level 9 Badge",
                "id": 3449079,
                "name": "Level 9"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r010_on.png",
                "description": "Ruby Level 10 Badge",
                "id": 3519065,
                "name": "Level 10"
            }, {
                "url": "http://www.singpath.com/static/badges/ruby/r011_on.png",
                "description": "Ruby Level 11 Badge",
                "id": 3523070,
                "name": "Level 11"
            }],
            "name": "Ruby"
        }],
        "type": "get_game_paths"
    });

    $httpBackend.whenGET('/jsonapi/story').respond(stories);
    $httpBackend.whenGET('/jsonapi/story/14611860').respond(stories[0]);

    $httpBackend.whenGET('/jsonapi/get_path_progress?details=1').respond({
        "currentProblemsetID": 11032,
        "currentProblemsetOrder": 9,
        "currentProblemsetDesc": "Tuples",
        "currentProblemsetName": "Python Level 9",
        "problemsInPath": 256,
        "currentPlayerProgress": 133,
        "details": [{
            "description": "The way of SingPath",
            "pathorder": 1,
            "problemsInProblemset": 10,
            "currentPlayerProgress": 13,
            "id": 11021,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p001_on.png",
                "required_badges": [],
                "problemsetid": 11021,
                "description": "Python Level 1 Badge",
                "name": "Level 1",
                "pathid": 10030,
                "awardOrder": 1,
                "id": 87572,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 1"
        }, {
            "description": "Variables, keywords, and statements",
            "pathorder": 2,
            "problemsInProblemset": 13,
            "currentPlayerProgress": 13,
            "id": 10034,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p002_on.png",
                "required_badges": [87572],
                "problemsetid": 10034,
                "description": "Python Level 2 Badge",
                "name": "Level 2",
                "pathid": 10030,
                "awardOrder": 2,
                "id": 88541,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 2"
        }, {
            "description": "Functions",
            "pathorder": 3,
            "problemsInProblemset": 24,
            "currentPlayerProgress": 19,
            "id": 11023,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p003_on.png",
                "required_badges": [88541],
                "problemsetid": 11023,
                "description": "Python Level 3 Badge",
                "name": "Level 3",
                "pathid": 10030,
                "awardOrder": 3,
                "id": 87573,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 3"
        }, {
            "description": "Conditionals",
            "pathorder": 4,
            "problemsInProblemset": 28,
            "currentPlayerProgress": 15,
            "id": 11026,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p004_on.png",
                "required_badges": [87573],
                "problemsetid": 11026,
                "description": "Python Level 4 Badge",
                "name": "Level 4",
                "pathid": 10030,
                "awardOrder": 4,
                "id": 88542,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 4"
        }, {
            "description": "Iteration",
            "pathorder": 5,
            "problemsInProblemset": 23,
            "currentPlayerProgress": 12,
            "id": 11029,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p005_on.png",
                "required_badges": [88542],
                "problemsetid": 11029,
                "description": "Python Level 5 Badge",
                "name": "Level 5",
                "pathid": 10030,
                "awardOrder": 5,
                "id": 92683,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 5"
        }, {
            "description": "Strings",
            "pathorder": 6,
            "problemsInProblemset": 33,
            "currentPlayerProgress": 18,
            "id": 10040,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p006_on.png",
                "required_badges": [92683],
                "problemsetid": 10040,
                "description": "Python Level 6 Badge",
                "name": "Level 6",
                "pathid": 10030,
                "awardOrder": 6,
                "id": 549028,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 6"
        }, {
            "description": "Lists",
            "pathorder": 7,
            "problemsInProblemset": 36,
            "currentPlayerProgress": 14,
            "id": 11031,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p007_on.png",
                "required_badges": [549028],
                "problemsetid": 11031,
                "description": "Python Level 7 Badge",
                "name": "Level 7",
                "pathid": 10030,
                "awardOrder": 7,
                "id": 515027,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 7"
        }, {
            "description": "Dictionaries",
            "pathorder": 8,
            "problemsInProblemset": 13,
            "currentPlayerProgress": 10,
            "id": 10041,
            "badges": [{
                "url": "http://www.singpath.com/static/badges/python/p008_on.png",
                "required_badges": [515027],
                "problemsetid": 10041,
                "description": "Python Level 8 Badge",
                "name": "Level 8",
                "pathid": 10030,
                "awardOrder": 8,
                "id": 508029,
                "class": ["Badge", "Level_Badge"]
            }],
            "name": "Python Level 8"
        }, {
            "description": "Tuples",
            "pathorder": 9,
            "problemsInProblemset": 16,
            "currentPlayerProgress": 5,
            "id": 11032,
            "badges": [],
            "name": "Python Level 9"
        }, {
            "description": "Classes & Objects",
            "pathorder": 10,
            "problemsInProblemset": 19,
            "currentPlayerProgress": 2,
            "id": 38394,
            "badges": [],
            "name": "Python Level 10"
        }, {
            "description": "Recursion",
            "pathorder": 11,
            "problemsInProblemset": 17,
            "currentPlayerProgress": 12,
            "id": 11028,
            "badges": [],
            "name": "Python Level 11"
        }, {
            "description": "Games & Puzzles",
            "pathorder": 12,
            "problemsInProblemset": 2,
            "currentPlayerProgress": 0,
            "id": 41101,
            "badges": [],
            "name": "Python Level 12"
        }, {
            "description": "List Comprehensions",
            "pathorder": 13,
            "problemsInProblemset": 9,
            "currentPlayerProgress": 0,
            "id": 6603407,
            "badges": [],
            "name": "Python Level 13"
        }, {
            "description": "Python Built-In Library",
            "pathorder": 14,
            "problemsInProblemset": 6,
            "currentPlayerProgress": 0,
            "id": 6598750,
            "badges": [],
            "name": "Python Level 14"
        }, {
            "description": "Exceptions",
            "pathorder": 15,
            "problemsInProblemset": 5,
            "currentPlayerProgress": 0,
            "id": 6771183,
            "badges": [],
            "name": "Python Level 15"
        }, {
            "description": "Miscellaneous Problems",
            "pathorder": 16,
            "problemsInProblemset": 2,
            "currentPlayerProgress": 0,
            "id": 11155,
            "badges": [],
            "name": "New Problem Storage"
        }],
        "path": {
            "isGamePath": true,
            "description": "Python game path",
            "editor_id": 58546,
            "id": 10030,
            "name": "Python"
        }
    });

    $httpBackend.whenGET('/jsonapi/get_player_progress').respond({
        "paths": [{
            "name": "Java",
            "isGamePath": true,
            "editorPlayerId": 57754,
            "solvedProblems": 28,
            "problemsInPath": 155,
            "id": 2243213,
            "description": "Java game path"
        }, {
            "name": "Python",
            "isGamePath": true,
            "editorPlayerId": 58546,
            "solvedProblems": 12,
            "problemsInPath": 256,
            "id": 10030,
            "description": "Python game path"
        }, {
            "name": "Beginner Obj-C",
            "isGamePath": false,
            "editorPlayerId": 12196157,
            "solvedProblems": 1,
            "problemsInPath": 4,
            "id": 7520056,
            "description": "Beginner Path for Objective-C"
        }],
        "type": "Player Path Progress"
    });



    var rawQuests = sessionStorage.getItem('mock:scenario:quest:quests'),
        quests = rawQuests ? JSON.parse(rawQuests) : [];

    $httpBackend.whenGET('/jsonapi/quest').respond(quests);
    $httpBackend.whenPOST('/jsonapi/quest').respond(function(meth, url, rawData) {
        var data = JSON.parse(rawData),
            quest = {
                "story": data.storyID,
                "name": "The Spy Who Coded Javascript Easy",
                "videos": ["LL-9dh31lO8", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED", "LOCKED"],
                "solvedProblems": [],
                "created": "2013-05-11T08:26:09.351890",
                "numSolved": 0,
                "player": 57754,
                "path": data.pathID,
                "difficulty": data.difficulty,
                "id": quests.length + 1,
                "numProblems": 50
            };

        quests.push(quest);
        sessionStorage.setItem('mock:scenario:quest:quests', JSON.stringify(quests));
        return [200, quest];
    });

    $httpBackend.whenGET(/\/jsonapi\/quest\/\d+/).respond(function(meth, url, data) {
        var id = parseInt(url.split('/').slice(-1).pop(), 10) - 1;
        if (quests[id]) {
            return [200, quests[id]];
        }
        return [200, {
            "error": "No such quest"
        }];
    });

    $httpBackend.whenGET(/\/jsonapi\/create_quest_game\/\d+/).respond({
        "game_end": "None",
        "player": "Chris",
        "solvedProblemIDs": [],
        "currentProblem_id": "TBD",
        "playerID": 57754,
        "allSolved": false,
        "game_created": "2013-04-02 03:46:43.936750",
        "numProblems": 5,
        "numSolvedProblems": 0,
        "status": "ACCEPTING SOLUTIONS",
        "problemIDs": [10032, 10115, 18170, 37043, 17191],
        "problems": {
            "problems": [{
                "skeleton": "alpha=\r\npi=",
                "description": "Remember that the examples will show you the tests that will be run on your code to make sure you have accomplished the task.  If you are unsure exactly what you need to do, look at the examples.  For this problem create a variable named alpha that contains the alphabet, and a variable named pi that contains the value of pi, correct to 8 decimal places.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> alpha\r\n 'abcdefghijklmnopqrstuvwxyz'\r\n>>> pi\r\n 3.14159265",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 8,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 10032,
                "name": "More Fun with Variables"
            }, {
                "skeleton": null,
                "description": "For this task you need to create two variables containing the values listed.  Check the examples to see what values they should have.  This time you don't get any help.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> quest\r\n'To seek the Holy Grail.'\r\n>>> airspeed\r\n43",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 9,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 10115,
                "name": "Many Variables"
            }, {
                "skeleton": "perfect = (4+3",
                "description": "An essential skill of programming is finding and fixing errors.  Here is a simple example of a syntax error.  Look at the code that is given and fix the error. Syntax errors occur when you type something that python can't recognize.  \r\n\r\nIt could be a symbol that is in a weird place: \r\n  4+$ (You can't add 4 plus $)\r\n\r\nCorrect the code so that it no longer contains a syntax error",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> perfect\r\n7",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 10,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 18170,
                "name": "Syntax error"
            }, {
                "skeleton": "# This is where you will actually  be typing and testing your code. Click \"Run Code\".",
                "description": "Welcome to SingPath!  The first few questions will introduce you to the interface.  You do not need to type anything in the solution box below.  Just read the examples and the solution given.  When you are ready to go to the next question, click the \"Run\" button.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": "This section will give you examples of code that SingPath will use to test your program solutions.  \r\n\r\n",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 1,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 37043,
                "name": "Welcome"
            }, {
                "skeleton": "greeting = 'hello world'",
                "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> greeting\r\n'hello world'",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 2,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 17191,
                "name": "Your First Program"
            }],
            "type": "problems"
        },
        "nextProblemID": "TBD",
        "gameID": 15545585,
        "tournamentID": null,
        "name": "jsonapi created game",
        "roundID": null,
        "questID": 14744934,
        "heatID": null,
        "game_start": "2013-04-02 03:46:43.936780",
        "currentTime": "2013-04-02 03:46:45.722490",
        "game_type": "Timed Interview",
        "timelimit": 3600
    });

    // TODO: FIX
    $httpBackend.whenGET(/%5Bobject%20Object%5D/).respond(function() {
        return [404, "Not found"];
    });

    $httpBackend.whenGET('/jsonapi/game/15545585').respond({
        "game_end": "None",
        "player": "Chris",
        "solvedProblemIDs": [],
        "currentProblem_id": "TBD",
        "playerID": 57754,
        "allSolved": false,
        "game_created": "2013-04-02 03:46:43.936750",
        "numProblems": 5,
        "numSolvedProblems": 0,
        "status": "ACCEPTING SOLUTIONS",
        "problemIDs": [10032, 10115, 18170, 37043, 17191],
        "problems": {
            "problems": [{
                "skeleton": "alpha=\r\npi=",
                "description": "Remember that the examples will show you the tests that will be run on your code to make sure you have accomplished the task.  If you are unsure exactly what you need to do, look at the examples.  For this problem create a variable named alpha that contains the alphabet, and a variable named pi that contains the value of pi, correct to 8 decimal places.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> alpha\r\n 'abcdefghijklmnopqrstuvwxyz'\r\n>>> pi\r\n 3.14159265",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 8,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 10032,
                "name": "More Fun with Variables"
            }, {
                "skeleton": null,
                "description": "For this task you need to create two variables containing the values listed.  Check the examples to see what values they should have.  This time you don't get any help.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> quest\r\n'To seek the Holy Grail.'\r\n>>> airspeed\r\n43",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 9,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 10115,
                "name": "Many Variables"
            }, {
                "skeleton": "perfect = (4+3",
                "description": "An essential skill of programming is finding and fixing errors.  Here is a simple example of a syntax error.  Look at the code that is given and fix the error. Syntax errors occur when you type something that python can't recognize.  \r\n\r\nIt could be a symbol that is in a weird place: \r\n  4+$ (You can't add 4 plus $)\r\n\r\nCorrect the code so that it no longer contains a syntax error",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> perfect\r\n7",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 10,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 18170,
                "name": "Syntax error"
            }, {
                "skeleton": "# This is where you will actually  be typing and testing your code. Click \"Run Code\".",
                "description": "Welcome to SingPath!  The first few questions will introduce you to the interface.  You do not need to type anything in the solution box below.  Just read the examples and the solution given.  When you are ready to go to the next question, click the \"Run\" button.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": "This section will give you examples of code that SingPath will use to test your program solutions.  \r\n\r\n",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 1,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 37043,
                "name": "Welcome"
            }, {
                "skeleton": "greeting = 'hello world'",
                "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
                "path_id": 10030,
                "problemset_id": 11021,
                "examples": ">>> greeting\r\n'hello world'",
                "interface": {
                    "codeHighlightKey": "python",
                    "name": "Python",
                    "description": "Python 2.5"
                },
                "problemsetorder": 2,
                "editor": {
                    "player_id": 58546,
                    "nickname": "Danny",
                    "email": "PRIVATE"
                },
                "id": 17191,
                "name": "Your First Program"
            }],
            "type": "problems"
        },
        "nextProblemID": "TBD",
        "gameID": 15545585,
        "tournamentID": null,
        "name": "jsonapi created game",
        "roundID": null,
        "questID": 14744934,
        "heatID": null,
        "game_start": "2013-04-02 03:46:43.936780",
        "currentTime": "2013-04-02 03:46:45.722490",
        "game_type": "Timed Interview",
        "timelimit": 3600
    });

    $httpBackend.whenPOST("/jsonapi/verify_for_game").respond({
        "game_id": "15545585",
        "errors": "Traceback (most recent call last):\n  File \"/home/server/scipy-verifier/python_server/verifiers/python_verifier.py\", line 47, in runPythonInstance\n    compiled = compile(solution, 'submitted code', 'exec')\n  File \"submitted code\", line 1\n    alpha=\n     ^\nSyntaxError: invalid syntax\n",
        "problem_id": 10032
    });

});