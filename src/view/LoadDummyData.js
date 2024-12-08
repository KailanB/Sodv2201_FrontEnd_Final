

export const LoadData = () => {

    // localStorage.clear();
    const allPrograms = JSON.parse(localStorage.getItem('programs')) || [];
    if (allPrograms.length < 1)
    {
        // create an indivudla file for importing data to keep the files clean
        let dummyData = [
            {department: "Software Development", program: "Diploma", term: "fall", startDate: "September", endDate: "December", legnth: "6 months", description: "This 2 year diploma course teaches students everything they need to gain a junior developer job. Starting with programming foundation and fundamentals to building full stack web apps, games, and more by completion", fee: "50,000", code: "23523", courses: [{CourseName: "Sodv", CourseCode: 2202, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Diploma", Description: "Teachers learners the ins and outs of object oriented programming", CourseId: 1}, {CourseName: "Sodv", CourseCode: 2201, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Diploma", Description: "Teachers learners the fundamentals of React in javascript.", CourseId: 2}, {CourseName: "Data", CourseCode: 2201, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Diploma", Description: "Teachers learners the fundamentals of database administration.", CourseId: 3}]},
            {department: "Software Development", program: "Certificate", term: "fall", startDate: "September", endDate: "December", legnth: "6 months", description: "Our certificate program offers students a fast track into the world of programming. Focusing on the basics and fundamentals.", fee: "30,000", code: "23524", courses: [{CourseName: "Sodv", CourseCode: 1101, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Certificate", Description: "Teachers learners the basics of programming using C++", CourseId: 4}, {CourseName: "Tech", CourseCode: 1101, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Certificate", Description: "Teachers learners the fundamentals of web programming.", CourseId: 5}, {CourseName: "Tech", CourseCode: 1102, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Certificate", Description: "Teachers learners the fundamentals of IoT.", CourseId: 6}]},
            {department: "Software Development", program: "Post-Diploma", term: "fall", startDate: "September", endDate: "December", legnth: "6 months", description: "The Post-Diploma program takes a junior developers skills to the next level. Tackling new concepts and algorithms.", fee: "75,000", code: "23525", courses: [{CourseName: "Sodv", CourseCode: 3202, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Post-Diploma", Description: "Teachers learners advanced object oriented architecture", CourseId: 7}, {CourseName: "Data", CourseCode: 3202, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Post-Diploma", Description: "Teachers learners advanced concepts managing databases.", CourseId: 8}, {CourseName: "Sodv", CourseCode: 3201, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Post-Diploma", Description: "Teachers learners advanced and modern web programming concepts.", CourseId: 9}, {CourseName: "Sodv", CourseCode: 3203, Term: "Winter", StartDate: "2025-01-05", EndDate: "2025-04-25", Department:"SoftWare Development", Program: "Post-Diploma", Description: "Teachers learners the basics of using Unreal Engine.", CourseId: 9}]},
            // {department: 'Engineering', program: "Certificate", term: "fall", startDate: "September", endDate: "December", legnth: "6 months", description: "This is Engineering", fee: "20,000", code: "54523", courses: [] }
        ];
        localStorage.setItem('programs', JSON.stringify(dummyData));
    }

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    // if no user data exists create admin dummy data
    if(allUsers.length < 1)
    {
        
            // admin account
            const users = [{
                firstName: 'Teeny',
                lastName: 'Tine',
                email: 'admin@gmail.com',
                phone: '123-456-1234',
                birthday: '1900-10-10',
                department: 'IT',
                program: '',
                term: '',
                userName: 'TT',
                password: '123',
                status: 'Admin',
                studentId: '',
                courses: []
            },
            // add extra dummy data - students
            {
                firstName: 'Scram',
                lastName: 'Biss',
                email: 'scramb@gmail.com',
                phone: '133-556-1739',
                birthday: '2010-6-10',
                department: 'Software Development',
                program: 'Diploma',
                term: 'Fall',
                userName: 'Scramb',
                password: '123',
                status: 'Student',
                studentId: '5',
                courses: []
            },
            {
                firstName: 'Rosa',
                lastName: 'Diaz',
                email: 'rosadiaz@gmail.com',
                phone: '543-555-8643',
                birthday: '1990-2-15',
                department: 'Software Development',
                program: 'Post-Diploma',
                term: 'Winter',
                userName: 'RD',
                password: '123',
                status: 'Student',
                studentId: '3',
                courses: []
            },
            {
                firstName: 'Michael',
                lastName: 'Scott',
                email: 'mscott@gmail.com',
                phone: '434-325-9809',
                birthday: '1970-7-24',
                department: 'Software Development',
                program: 'Certificate',
                term: 'Spring',
                userName: 'Mscott',
                password: '123',
                status: 'Student',
                studentId: '8',
                courses: []
            }
        ]; 

        // dummy data for admin is good
        // separate users from admin users 
        // or we could add privilege access for admins
        localStorage.setItem('users', JSON.stringify(users));
    }



    const allMessages = JSON.parse(localStorage.getItem('messages')) || [];
    if (allMessages.length < 1)
    {
        let dummyData = [
            {fullName: 'Eleanor Shellstrop', email: 'eleanor@gmail.com', message: 'Hi I was just wondering if you had a moral philosophy program? If not is your college planning to add one soon?? Regards. Eleanor.' },
            {fullName: 'Adrian Pimento', email: 'adrianpimento@gmail.com', message: 'I just found your college! I want to apply to your software development class but I was having trouble registering. I think I applied too many times' },
            {fullName: 'Frito', email: 'frito@gmail.com', message: 'Does your college offer scholarships? I really like my money so I don\'t want to spend that much' }
        ]


        localStorage.setItem('messages', JSON.stringify(dummyData));


    }

}


