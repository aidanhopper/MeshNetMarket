/** Types generated for queries found in "src/db/sql/ziti_hosts.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type protocol = 'http' | 'tcp' | 'tcp/udp' | 'udp';

/** 'InsertZitiHost' parameters type */
export interface IInsertZitiHostParams {
  address?: string | null | void;
  allowed_port_ranges?: string | null | void;
  forward_ports?: boolean | null | void;
  forward_protocol?: boolean | null | void;
  name?: string | null | void;
  port?: string | null | void;
  protocol?: protocol | null | void;
  ziti_id?: string | null | void;
}

/** 'InsertZitiHost' return type */
export interface IInsertZitiHostResult {
  address: string;
  allowed_port_ranges: string | null;
  forward_ports: boolean;
  forward_protocol: boolean;
  id: string;
  name: string;
  port: string | null;
  protocol: protocol | null;
  ziti_id: string;
}

/** 'InsertZitiHost' query type */
export interface IInsertZitiHostQuery {
  params: IInsertZitiHostParams;
  result: IInsertZitiHostResult;
}

const insertZitiHostIR: any = {"usedParamSet":{"name":true,"forward_ports":true,"protocol":true,"ziti_id":true,"address":true,"forward_protocol":true,"allowed_port_ranges":true,"port":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":165,"b":169}]},{"name":"forward_ports","required":false,"transform":{"type":"scalar"},"locs":[{"a":176,"b":189}]},{"name":"protocol","required":false,"transform":{"type":"scalar"},"locs":[{"a":196,"b":204}]},{"name":"ziti_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":218}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":225,"b":232}]},{"name":"forward_protocol","required":false,"transform":{"type":"scalar"},"locs":[{"a":239,"b":255}]},{"name":"allowed_port_ranges","required":false,"transform":{"type":"scalar"},"locs":[{"a":262,"b":281}]},{"name":"port","required":false,"transform":{"type":"scalar"},"locs":[{"a":288,"b":292}]}],"statement":"INSERT INTO ziti_hosts (\n    name,\n    forward_ports,\n    protocol,\n    ziti_id,\n    address,\n    forward_protocol,\n    allowed_port_ranges,\n    port\n) VALUES (\n    :name,\n    :forward_ports,\n    :protocol,\n    :ziti_id,\n    :address,\n    :forward_protocol,\n    :allowed_port_ranges,\n    :port\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO ziti_hosts (
 *     name,
 *     forward_ports,
 *     protocol,
 *     ziti_id,
 *     address,
 *     forward_protocol,
 *     allowed_port_ranges,
 *     port
 * ) VALUES (
 *     :name,
 *     :forward_ports,
 *     :protocol,
 *     :ziti_id,
 *     :address,
 *     :forward_protocol,
 *     :allowed_port_ranges,
 *     :port
 * )
 * RETURNING *
 * ```
 */
export const insertZitiHost = new PreparedQuery<IInsertZitiHostParams,IInsertZitiHostResult>(insertZitiHostIR);


/** 'DeleteZitiHost' parameters type */
export interface IDeleteZitiHostParams {
  id?: string | null | void;
}

/** 'DeleteZitiHost' return type */
export interface IDeleteZitiHostResult {
  address: string;
  allowed_port_ranges: string | null;
  forward_ports: boolean;
  forward_protocol: boolean;
  id: string;
  name: string;
  port: string | null;
  protocol: protocol | null;
  ziti_id: string;
}

/** 'DeleteZitiHost' query type */
export interface IDeleteZitiHostQuery {
  params: IDeleteZitiHostParams;
  result: IDeleteZitiHostResult;
}

const deleteZitiHostIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":36}]}],"statement":"DELETE FROM ziti_hosts WHERE id = :id RETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM ziti_hosts WHERE id = :id RETURNING *
 * ```
 */
export const deleteZitiHost = new PreparedQuery<IDeleteZitiHostParams,IDeleteZitiHostResult>(deleteZitiHostIR);


/** 'UpdateZitiHost' parameters type */
export interface IUpdateZitiHostParams {
  address?: string | null | void;
  allowed_port_ranges?: string | null | void;
  forward_ports?: boolean | null | void;
  forward_protocol?: boolean | null | void;
  id?: string | null | void;
  port?: string | null | void;
  protocol?: protocol | null | void;
  ziti_id?: string | null | void;
}

/** 'UpdateZitiHost' return type */
export interface IUpdateZitiHostResult {
  address: string;
  allowed_port_ranges: string | null;
  forward_ports: boolean;
  forward_protocol: boolean;
  id: string;
  name: string;
  port: string | null;
  protocol: protocol | null;
  ziti_id: string;
}

/** 'UpdateZitiHost' query type */
export interface IUpdateZitiHostQuery {
  params: IUpdateZitiHostParams;
  result: IUpdateZitiHostResult;
}

const updateZitiHostIR: any = {"usedParamSet":{"forward_ports":true,"protocol":true,"ziti_id":true,"address":true,"forward_protocol":true,"allowed_port_ranges":true,"port":true,"id":true},"params":[{"name":"forward_ports","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":55}]},{"name":"protocol","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":81}]},{"name":"ziti_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":105}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":122,"b":129}]},{"name":"forward_protocol","required":false,"transform":{"type":"scalar"},"locs":[{"a":155,"b":171}]},{"name":"allowed_port_ranges","required":false,"transform":{"type":"scalar"},"locs":[{"a":200,"b":219}]},{"name":"port","required":false,"transform":{"type":"scalar"},"locs":[{"a":233,"b":237}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":250,"b":252}]}],"statement":"UPDATE ziti_hosts\nSET\n    forward_ports = :forward_ports,\n    protocol = :protocol,\n    ziti_id = :ziti_id,\n    address = :address,\n    forward_protocol = :forward_protocol,\n    allowed_port_ranges = :allowed_port_ranges,\n    port = :port\nWHERE id = :id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE ziti_hosts
 * SET
 *     forward_ports = :forward_ports,
 *     protocol = :protocol,
 *     ziti_id = :ziti_id,
 *     address = :address,
 *     forward_protocol = :forward_protocol,
 *     allowed_port_ranges = :allowed_port_ranges,
 *     port = :port
 * WHERE id = :id
 * RETURNING *
 * ```
 */
export const updateZitiHost = new PreparedQuery<IUpdateZitiHostParams,IUpdateZitiHostResult>(updateZitiHostIR);


