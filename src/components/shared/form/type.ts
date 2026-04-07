//ZOD
import { z } from "zod";
import type { FormSchema } from "./schema";

export type FormData = z.infer<typeof FormSchema>