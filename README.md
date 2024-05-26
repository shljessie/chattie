# Chattie Server

This is the backend server for the Chattie application, which handles API requests and data storage for survey responses.

## API Endpoints

### Submit Survey Data

Submit survey data to the `/submit-survey` endpoint using the following cURL command:

```sh
curl -X POST https://chattie-server-4b47d3d64614.herokuapp.com/submit-survey -H "Content-Type: application/json" -d '{"prolific_id": "YOUR_PROLIFIC_ID", "uuid": "YOUR_UUID", "data": {"session1": {"consistency": "option1", "naturalness": "option2", "engagement": "option1", "probingQuestion1": "option2", "probingQuestion2": "option1", "probingQuestion3": "option2"}}}'
```


### Load CSV Data
Load CSV data from the specified type, stage, and num using the following cURL command:

```
curl -X GET 'https://chattie-server-4b47d3d64614.herokuapp.com/load-csv?type=yourType&stage=yourStage&num=yourNum'
```


### Managing PostgreSQL Database on Heroku
Use the Heroku CLI to connect to your PostgreSQL database:
```
heroku pg:psql
```


### 

Once connected to the PostgreSQL database, list all tables to ensure your survey_responses table exists:

```
\dt
```

To see the schema of the survey_responses table:

```
\d survey_responses
```

```
SELECT * FROM survey_responses;
```


To log data 
```
curl -X POST https://chattie-server-4b47d3d64614.herokuapp.com/submit-survey -H "Content-Type: application/json" -d '{"type": "exampleType", "stage": "exampleStage", "num": 2, "response": "exampleResponse2"}'
```


## Heroku Deployment
```
git add .
git commit -m "Update backend configuration"
git push heroku main

```