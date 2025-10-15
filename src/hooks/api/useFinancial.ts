import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useSummary = () =>
  useQuery({
    queryKey: ["summary"],
    queryFn: async () => (await api.get("/financial/summary")).data,
  });

export const useWorkingCapital = () =>
  useQuery({
    queryKey: ["working-capital"],
    queryFn: async () => (await api.get("/financial/working-capital")).data,
  });

export const useWallet = () =>
  useQuery({
    queryKey: ["wallet"],
    queryFn: async () => (await api.get("/financial/wallet")).data,
  });

export const useRecentTransactions = () =>
  useQuery({
    queryKey: ["tx-recent"],
    queryFn: async () => (await api.get("/financial/transactions/recent")).data,
  });

export const useScheduledTransfers = () =>
  useQuery({
    queryKey: ["scheduled"],
    queryFn: async () => (await api.get("/financial/transfers/scheduled")).data,
  });
