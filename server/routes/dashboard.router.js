const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get all the  APIS Trips 
router.get('/apis', rejectUnauthenticated, (req, res) => {
    console.log('GET Route');
    console.log('USER ID', req.user.id);
    
    let userId = req.user.id;

    const queryText = `SELECT flightBuilding1.airportcode AS inboundAirportCode,
		flightBuilding1.city AS inboundAirportCity,
		flightBuilding1.description AS inboundAiportDesc,
		flightBuilding1.cntrycode AS inboundCountryCode,
		flightBuilding2.city AS departureAirportCity,
		flightBuilding2.cntrycode AS departureCountryCode,
		flightBuilding2.airportcode AS departureAirportCode,
		flightBuilding2.description AS departureAirportDesc,
		it."inboundarrivalLocation_airport_id",
		it."localdeparturetimeStamp" AS departureTimeStamp, 
		it.localarrivaltimestamp AS arrivalTimeStamp,
		"flight".id,
		"flight".flight_status ,
	   flightBuilding2.airportcode AS departureAirportcode,
	   it.departure_airport_id

    from "itinerary" AS it
    inner join "airport" as flightbuilding1 on it.departure_airport_id = flightbuilding1.id
    inner join "airport" as flightbuilding2 on it."inboundarrivalLocation_airport_id" = flightbuilding2.id
    LEFT JOIN "user_itinerary" ON it.id = "user_itinerary".itinerary_id
    LEFT JOIN "flight" ON it.id = "flight".itinerary_id
    JOIN "user" ON "user_itinerary".user_id = "user".id
    WHERE "user".id = $1;`;
    pool.query(queryText, [userId]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500)
    })
})

// //delete the APIS Trip from the database
// router.delete('/delete/:id', (req,res) => {
//     console.log('req.params.id: ' + req.params.id + ' req.user.id: ' + req.user.id);
//     let queryText = ``
//   pool.query(queryText, [req.params.id, req.user.id]).then((result) => {
//       res.sendStatus(200);
//   }).catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//   });;

// });

module.exports = router;