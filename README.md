execute:
```
node index.js
```

expected result:
```json
{
    "summary": {
        "match": 3,
        "notMatch": 1,
        "notFound": 1,
        "duplicate": 1,
        "trackers": 5
    },
    "details": [
        {
            "tracker": "onboarding",
            "duplicate": false,
            "found": true,
            "match": true,
            "total": {
                "match": 1,
                "notMatch": 0,
                "notFound": 0
            },
            "details": [
                {
                    "key": "screenName",
                    "expect": "Screen OnBoarding - {}",
                    "actual": "Screen OnBoarding - 0",
                    "status": "MATCH"
                }
            ]
        },
        {
            "tracker": "click search",
            "duplicate": true,
            "found": true,
            "match": true,
            "total": {
                "match": 4,
                "notMatch": 0,
                "notFound": 0
            },
            "details": [
                {
                    "key": "event",
                    "expect": "clickTopNav",
                    "actual": "clickTopNav",
                    "status": "MATCH"
                },
                {
                    "key": "eventCategory",
                    "expect": "top nav - {}",
                    "actual": "top nav - /",
                    "status": "MATCH"
                },
                {
                    "key": "eventAction",
                    "expect": "click search box{}",
                    "actual": "click search box",
                    "status": "MATCH"
                },
                {
                    "key": "eventLabel",
                    "expect": "{}",
                    "actual": null,
                    "status": "MATCH"
                }
            ]
        },
        {
            "tracker": "click wishlist",
            "duplicate": false,
            "found": true,
            "match": true,
            "total": {
                "match": 4,
                "notMatch": 0,
                "notFound": 0
            },
            "details": [
                {
                    "key": "event",
                    "expect": "clickTopNav",
                    "actual": "clickTopNav",
                    "status": "MATCH"
                },
                {
                    "key": "eventCategory",
                    "expect": "top nav",
                    "actual": "top nav",
                    "status": "MATCH"
                },
                {
                    "key": "eventAction",
                    "expect": "click wishlist",
                    "actual": "click wishlist",
                    "status": "MATCH"
                },
                {
                    "key": "eventLabel",
                    "expect": "",
                    "actual": "",
                    "status": "MATCH"
                }
            ]
        },
        {
            "tracker": "click inbox",
            "duplicate": false,
            "found": false,
            "match": false,
            "total": {
                "match": 0,
                "notMatch": 0,
                "notFound": 0
            },
            "details": []
        },
        {
            "tracker": "click product",
            "duplicate": false,
            "found": true,
            "match": false,
            "total": {
                "match": 7,
                "notMatch": 1,
                "notFound": 1
            },
            "details": [
                {
                    "key": "event",
                    "expect": "product",
                    "actual": "product",
                    "status": "MATCH"
                },
                {
                    "key": "eventCategory",
                    "expect": "clickProduct",
                    "actual": "clickProduct",
                    "status": "MATCH"
                },
                {
                    "key": "eventAction",
                    "expect": "click product {}",
                    "actual": "click product image",
                    "status": "MATCH"
                },
                {
                    "key": "eventLabel",
                    "expect": "{}",
                    "actual": "product asus rog",
                    "status": "MATCH"
                },
                {
                    "key": "product.0.id",
                    "expect": "IsNotNullOrUndefined",
                    "actual": 10,
                    "status": "MATCH"
                },
                {
                    "key": "product.0.category",
                    "expect": "electronic",
                    "status": "NOT_FOUND"
                },
                {
                    "key": "product.0.name",
                    "expect": "samsung {}",
                    "actual": "asus rog phone 2",
                    "status": "NOT_MATCH"
                },
                {
                    "key": "product.0.dimension.0.height",
                    "expect": "IsNotNullOrUndefined",
                    "actual": 10,
                    "status": "MATCH"
                },
                {
                    "key": "product.0.dimension.0.width",
                    "expect": "IsNotNullOrUndefined",
                    "actual": 15,
                    "status": "MATCH"
                }
            ]
        }
    ]
}
```
