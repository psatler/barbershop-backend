import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.query;

    const listMonthAvailability = container.resolve(
      ListMonthAvailabilityService,
    );

    const availability = await listMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
