# React + TypeScript + Vite

### Requirements:

The web app will need to fetch spatial data from an API and display it in two different views: a Table and a Map.
It will need to be deployed with Vercel.

#### Map:

-   Should use a `<form />` element to filter the type of data being shown.
-   Cater for search (by name of location) and also have a way to filter by category.
-   The places’ relevant category should be rendered as an icon on the map marker (e.g. food could be 🍔)
-   any type of category icons shown on the markers should be fine, as long as they are somewhat representative of the category, and distinguishable from each other.
-   The map should also adjust the viewport to show the updated list of locations.

#### Table:

-   The table needs to support pagination, and sorting on the columns.
-   Lastly, when clicking on a row on the table, it should fetch the place specific information
    and display it in a modal.

### API use

#### Endpoints:

-   `GET /api/places/`: Fetches a list of places, along with coordinates
-   `GET /api/places/:id`: Fetches a single place by ID

#### Examples:

Sorting

-   `/api/places?sortBy=name&sortDirection=desc` would sort by the name field in desc (descending) order.

Filtering

-   `/api/places?search=Don&category=food` fetches all places which have the name "Don" and the category "food"

Paging

-   `/api/places?page=2&limit=3` fetches up to a limit of 3 places. If there are more it goes to the second
    set of 3 results (i.e. page 2)

#### Return JSON

```
{
  "meta": {
    "limit": 100,
    "page": 1,
    "totalPages": 1,
    "totalItems": 81
  },
  "data": [
    {
      "id": "9",
      "name": "Motley Crew: Woodstock",
      "description": "A dynamic fitness studio in the creative Woodstock area.",
      "category": "health",
      "companyId": "1",
      "address": "66 Albert Rd, Woodstock, Cape Town, 7915",
      "coordinates": {
        "lat": -33.930257,
        "lon": 18.446058
      }
    },
	...
  ]
}
```
