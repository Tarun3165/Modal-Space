// app/api/data/route.js
import axios from "axios";

const MODAL_SPACE_URL = process.env.MODAL_SPACE_URL; 

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const response = await axios.get(
      `${process.env.MODAL_SPACE_URL}/model-spaces/${id}`
    );

    if (!response.data) {
      return new Response('Failed to fetch data', { status: 500 });
    }

    return new Response(JSON.stringify(response?.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('error===>>:', error?.response?.data);

    const data = {
      status: error?.response?.status || 500,
      message: error?.message || 'An error occurred',
      data: error?.response?.data || null,
    };

    return new Response(JSON.stringify(data), {
      status: data.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


  export async function POST(request, { params }) {
    try {
      const { id } = params;
      const body = await request.json();
  
      const response = await axios.post(
        `${process.env.MODAL_SPACE_URL}/model-spaces/${id}/predict`,
        body
      );
  
      console.log('response:==>>', response?.data?.data);
  
      const res = {
        status: 200,
        data: response?.data?.data,
      };
  
      return new Response(JSON.stringify(res), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log('error===>>:', error?.message);
  
      const data = {
        status: error?.response?.status || 500,
        message: error?.message || 'An error occurred',
        data: error?.response?.data || null,
      };
  
      return new Response(JSON.stringify(data), {
        status: data.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }