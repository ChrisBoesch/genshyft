if (!myApp) {
    console.log("mocked app not set");
}

myApp.run(function($httpBackend) {

    $httpBackend.whenGET(/^partials/).passThrough();
    $httpBackend.whenPOST('/jsonapi/log_event').respond(function(_, __, data) {
        return [200, JSON.parse(data)];
    });

    $httpBackend.whenGET('/jsonapi/player').respond({
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
    });
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
});