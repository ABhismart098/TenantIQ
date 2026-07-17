import { useState, useCallback } from 'react';
import reportService from '../services/report.service';

export function useReport(token) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserActivityReport = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const result = await reportService.getUserActivityReport(token);
      setReports(result.data || []);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getComplaintReport = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const result = await reportService.getComplaintReport(token);
      setReports(result.data || []);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return {
    reports,
    isLoading,
    error,
    getUserActivityReport,
    getComplaintReport
  };
}
