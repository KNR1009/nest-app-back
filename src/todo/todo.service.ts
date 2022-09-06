import { ForbiddenException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  // ユーザーのタスクを全件取得
  getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  // 特定のタスクを取得する
  getTask(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
  }
  // 新規タスクの作成
  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }
  // 更新タスクの作成
  async updateTask(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('No permission to update');
    }
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }
  // タスクの削除
  async deleteTask(userId: number, taskId: number): Promise<void> {
    // 本人のタスクかを確認
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('No permission to delete');
    }

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
