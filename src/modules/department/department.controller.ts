import type { NextFunction, Request, Response } from "express";

import * as DepartmentUsecase from "./department.usecase.js";

export async function findDepartments(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DepartmentUsecase.findDepartments();
    return res.status(200).json({
      data,
      message: "Departments fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function findDepartmentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await DepartmentUsecase.findDepartmentById(String((req.params as any).id));
    return res.status(200).json({
      data,
      message: "Department fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function saveDepartment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DepartmentUsecase.saveDepartment(req.body);
    return res.status(200).json({
      data,
      message: "Department saved successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateDepartment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DepartmentUsecase.updateDepartment(req.body);
    return res.status(200).json({
      data,
      message: "Department updated successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteDepartment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DepartmentUsecase.deleteDepartmentById(String((req.params as any).id));
    return res.status(200).json({
      data,
      message: "Department deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
}

