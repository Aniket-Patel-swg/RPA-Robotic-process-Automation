import { APIGatewayProxyEvent } from 'aws-lambda';
import { routeHandler } from '../src/handler/sampleRouteHandler';
import { Handler } from '../src/handler/sampleHandler';

test('Checking if API is working or not', () =>{
   const event : APIGatewayProxyEvent ={
        
   }
   
   const handler = new Handler()

})
