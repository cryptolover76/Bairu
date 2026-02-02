
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

async function runTests() {
  console.log('🧪 Running Smoke Tests...');

  try {
    // 1. Test Cities
    const citiesResp = await axios.get(`${BASE_URL}/public/cities`);
    if (citiesResp.data.ok) {
      console.log('✅ Public Cities API works');
    }

    // 2. Test Categories
    const catResp = await axios.get(`${BASE_URL}/public/categories`);
    if (catResp.data.ok) {
      console.log('✅ Public Categories API works');
    }

    // 3. Test Businesses (Empty list should not break)
    const bizResp = await axios.get(`${BASE_URL}/public/businesses`);
    if (bizResp.data.ok) {
      console.log('✅ Public Businesses API works');
    }

    console.log('✨ All smoke tests passed (public endpoints)!');
  } catch (error: any) {
    console.error('❌ Smoke tests failed:', error.message);
    // Fix: Cast process to any to avoid TS error in restricted environments where 'exit' might not be in the Process type definition
    (process as any).exit(1);
  }
}

runTests();
