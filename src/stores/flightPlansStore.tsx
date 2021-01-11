import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlightPlan } from '../models/FlightPlan';

export const getFlightPlans = async (): Promise<FlightPlan[] | undefined> => {
  try {
    const plansRaw = await AsyncStorage.getItem('flightplans');
    if(plansRaw !== null) {
      const plans: FlightPlan[] = JSON.parse(plansRaw);
      return !!plans ? plans.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
    } else {
      return [];
    }
  } catch(error) {
    console.error(`Error reading flight plans - Error: ${error}`);
  }
};

export const getFlightPlanById = async (id: string): Promise<FlightPlan | null | undefined> => {
  try {
    const plans = await getFlightPlans();
    if(plans !== undefined) {
      const plan = plans.find((element) => element.id === id);
      return plan !== undefined ? plan : null;
    } else {
      return null;
    }
  } catch(error) {
    console.error(`Error reading flight plan: ${id} - Error: ${error}`);
  }
};

export const addFlightPlan = async (flightPlan: FlightPlan): Promise<void | undefined> => {
  try {
    let plans = await getFlightPlans();
    if(plans === undefined) {
      plans = [];
    }
    plans.unshift(flightPlan);
    const plansRaw = JSON.stringify(plans);
    await AsyncStorage.setItem('flightplans', plansRaw);

  } catch(error) {
    console.error(`Error adding flight plan: ${JSON.stringify(flightPlan)} - Error: ${error}`);
  }
};

export const updateFlightPlan = async (flightPlan: FlightPlan): Promise<void | undefined> => {
  try {
    const plans = await getFlightPlans();
    if(plans === undefined) {
      throw 'No existing flight plans';
    }
    const planIndex = plans.findIndex((element) => element.id === flightPlan.id);
    if(planIndex === -1) {
      throw 'Flight plan not found';
    }
    plans[planIndex] = flightPlan;
    const plansRaw = JSON.stringify(plans);
    await AsyncStorage.setItem('flightplans', plansRaw);

  } catch(error) {
    console.error(`Error updating flight plan: ${JSON.stringify(flightPlan)} - Error: ${error}`);
  }
};

export const deleteFlightPlan = async (flightPlan: FlightPlan): Promise<void | undefined> => {
  try {
    let plans = await getFlightPlans();
    if(plans === undefined) {
      throw 'No existing flight plans';
    }
    plans = plans.filter((element) => element.id !== flightPlan.id);
    const plansRaw = JSON.stringify(plans);
    await AsyncStorage.setItem('flightplans', plansRaw);

  } catch(error) {
    console.error(`Error deleting flight plan: ${JSON.stringify(flightPlan)} - Error: ${error}`);
  }
};