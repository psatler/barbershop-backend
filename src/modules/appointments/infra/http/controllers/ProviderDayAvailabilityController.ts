import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.query;

    const listDayAvailability = container.resolve(ListDayAvailabilityService);

    const availability = await listDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
