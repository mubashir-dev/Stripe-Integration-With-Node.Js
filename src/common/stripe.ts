import Stripe from 'stripe';
import { stripeConfig } from '../config';

export const stripe = new Stripe(stripeConfig.key as string, {
    apiVersion: '2023-08-16'
});


