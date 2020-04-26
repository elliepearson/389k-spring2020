
# TV SHOWS

---

Name: Ellen Pearson

Date: 4/1/2020

Project Topic: Popular TV Shows

URL:

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Title          `Type: String`
- `Field 2`: Image          `Type: String`
- `Field 3`: Seasons        `Type: Number`
- `Field 4`: Release Year   `Type: Number`
- `Field 5`: Genre           `Type: [String]`

Schema:
```javascript
{
    title: String,
    image: String,
    seasons: Number,
    year: Number,
    genre: [String]
}
```

### 2. Add New Data

HTML form route: `/addShow`

POST endpoint route: `/api/addShow`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addShow',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        title: 'The Office',
        image: "https://img.nbc.com/sites/nbcunbc/files/images/2016/1/19/MDot-TheOffice-640x360-MP.jpg",
        seasons: 9,
        year: 2005,
        genre: ["Mockumentary", "Sitcom", "Comedy"]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getShows`

### 4. Search Data

Search Field: `title`

### 5. Navigation Pages

Navigation Filters
1. Oldest Show -> `/oldest`
2. Select a Genre -> `/genre/:genre_type`
3. Alphabetical Shows -> `/alphabetical`
4. Largest Number of Seasons -> `/largest`
5. Random Show -> `/random`
