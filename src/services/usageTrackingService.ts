import { api } from './api';
import { UsageInfo } from '../types/subscription';

class UsageTrackingService {
  async getUsage(): Promise<UsageInfo> {
    const response = await api.get('/subscription/current');
    return response.data;
  }

  getUsagePercentage(usage: UsageInfo): number {
    return usage.percentage;
  }

  isAtWarningThreshold(usage: UsageInfo): boolean {
    return usage.percentage >= 80;
  }

  isLimitExceeded(usage: UsageInfo): boolean {
    return usage.current >= usage.limit;
  }
}

export const usageTrackingService = new UsageTrackingService();
