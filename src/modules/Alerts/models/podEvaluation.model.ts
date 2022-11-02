import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IPodEvaluation } from '@/common/interfaces/podEvaluation.interface';

export type PodEvaluationCreationAttributes = Optional<
  IPodEvaluation,
  'podEvaluationKey' | 'podName' | 'podAnomalyEvaluation' | 'createdAt' | 'evaluatedAt' | 'podMetricKey' | 'clusterId'
>;

export class PodEvaluationModel extends Model<IPodEvaluation, PodEvaluationCreationAttributes> implements IPodEvaluation {
  public createdAt: Date;
  public podEvaluationKey: number;
  public podName: string;
  public clusterId: string;
  public podAnomalyEvaluation: boolean;
  public evaluatedAt: Date;
  public updatedAt: Date;
  public podMetricKey: number;
}

export default function (sequelize: Sequelize): typeof PodEvaluationModel {
  PodEvaluationModel.init(
    {
      podEvaluationKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      podName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      podAnomalyEvaluation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },

      evaluatedAt: {
        type: DataTypes.DATE(),
      },

      updatedAt: {
        type: DataTypes.DATE(),
      },

      podMetricKey: {
        type: DataTypes.INTEGER,
      },

      clusterId: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['pod_name'],
        },
        {
          unique: false,
          fields: ['evaluated_at'],
        },
      ],
      tableName: 'PodEvaluation',
      modelName: 'PodEvaluation',
      sequelize,
    },
  );
  return PodEvaluationModel;
}
