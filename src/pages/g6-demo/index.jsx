import React, { useEffect } from 'react'
import G6 from '@antv/g6';
import './registerShape';
import { surnameArr, nameArr, phoneHeaderArr } from './mock/name';
import { randomNum } from './utils';

let data = {
  nodes: [
    { id: 'node0', size: [130, 80], type:'ellipse', label:'前端练习生计划' },
    { id: 'node1', size: [40, 30] , type:'diamond', label: '1班' },
    { id: 'node2', size: [40, 30] , type:'diamond', label: '2班' },
    { id: 'node3', size: [40, 30] , type:'diamond', label: '3班' },
    { id: 'node4', size: 20 },
    { id: 'node5', size: 20 },
    { id: 'node6', size: 20 },
    { id: 'node7', size: 20 },
    { id: 'node8', size: 20 },
    { id: 'node9', size: 20 },
    { id: 'node10', size: 20 },
    { id: 'node11', size: 20 },
    { id: 'node12', size: 20 },
    { id: 'node13', size: 20 },
    { id: 'node14', size: 20 },
    { id: 'node15', size: 20 },
    { id: 'node16', size: 20 },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};

const initNodes = (data, MaxNum) => {
  let nodes = data.nodes;
  let edges = data.edges;

  if(nodes.length > MaxNum/2) {
    nodes = [];
  }

  const result = {nodes:[...nodes],edges:[...edges]};
  for (let i = 0; i < MaxNum-nodes.length; i++) {
    if( !result.nodes[i].label &&i < nodes.length) {
      result.nodes[i] = {
        ...result.nodes[i],
        label: `${surnameArr[i % 598]}${nameArr[i % 10]}`,
      };
    }
    else result.nodes.push({
      id: `node${i}`,
      size: 20,
      label: `${surnameArr[i % 598]}${nameArr[i % 10]}`,
      // phone: `${phoneHeaderArr[i % 5]}${(`${randomNum(10000000, 99999999)}`).slice(0, 8)}`,
    });
  }
  for (let i = edges.length+1; i < MaxNum-nodes.length; i++) {
    result.edges.push({
      target: `node${i}`,
      source: `node${randomNum(1, 3)}`,
    });
  }
  return result;
};

const Tutorital = () => {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
    if(!graph) {
      data = initNodes(data, 80);  // mock 一定数量的名字
      // 实例化 Minimap
      const minimap = new G6.Minimap()

      // 实例化 Graph
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: 'container',
        animate: true,
        animateCfg: {
          duration: 500,
          easing: 'linearEasing',
        },
        width: 600,
        height: 400,
        plugins: [minimap],
        modes: {
          default: ['drag-node','drag-canvas', 'zoom-canvas',]
        },
        defaultNode: {
          type:'cicle',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 20
          }
        },
        defaultEdge: {
          type: 'line',
          style: {
            lineWidth: 2,
          }
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: d => {
            if (d.source.id === 'node0') {
              return 200;
            }
            return 100;
          },
          onTick: () => {           // 可选
            console.log('ticking');
          },
          onLayoutEnd: () => {      // 可选
            console.log('force layout done');
    }
        },
        nodeStateStyles: {
          hover: {
            stroke: 'orange',
            fill: '#eeb64e',
            lineWidth: 3
          },
          selected: {
            stroke: 'red',
            fill: 'pink',
            lineWidth: 3
          }
        },
        edgeStateStyles: {
          hover: {
            stroke: 'green',
            lineWidth: 3
          },
        }
      })
    }

    graph.data(data)

    graph.render()

    graph.on('node:click', (evt) => {
      const node = evt.item;
      const edges = node.getEdges();

      graph.setItemState(evt.item, 'selected', !node.hasState('selected'));
      edges.forEach((edge) => {
        console.log(edge);
        console.log(edge._cfg);
        console.log(edge.source);
        console.log(edge.source===node.id);
        const model = {
          type: (node.hasState('selected') && edge.source===node.id) ? 'my-line-dash' : 'line',
          style: {
            lineWidth: 2,
          }
        };
      graph.updateItem(edge, model);
    });

    });

    graph.on('node:mouseenter', evt => {
      const node = evt.item;
      graph.setItemState(evt.item, 'hover', !node.hasState('selected'))
    })

    graph.on('node:mouseleave', evt => {
      // const node = evt.item;
      // const edges = node.getEdges();
      // edges.forEach((edge) => {
      //   graph.setItemState(edge, 'hover', false)
      // });
      graph.setItemState(evt.item, 'hover', false)
    })

    graph.on('edge:mouseenter', evt => {
      graph.setItemState(evt.item, 'hover', true)
    })

    graph.on('edge:mouseleave', evt => {
      graph.setItemState(evt.item, 'hover', false)
    })

  }, [])

  return <div ref={ref}></div>
}

export default Tutorital
